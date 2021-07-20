import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [errMessage, setErrorMessage] = useState(null)
  const [isError, setError] = useState(false)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect (() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=> {
    if(refresh === true){
      blogService.getAll().then(blogs =>
        setBlogs(blogs))
    }
    setRefresh(false)
  }, [refresh])

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setRefresh(true)
      })
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const blogRemoval = async (id) => {
    try {
      const res = await blogService.removeBlog(id)
      if(res.status === 204){
        setBlogs(blogs.filter((o) => o.id !== id))
      } else {
        setErrorMessage('Error while deleting blog')
        setError(true)
        setTimeout(() => {
          setErrorMessage('')
          setError(false)
        }, 5000)
      }
    } catch (error) {
      setErrorMessage('Error while deleting blog')
      setError(true)
      setTimeout(() => {
        setErrorMessage('')
        setError(false)
      }, 5000)
    }
  }

  const blogUpdate = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      const updated = { ...blogObject, id }
      setBlogs(
        blogs.map((o) => (o.id === updated.id ? updated : o))
      )
    } catch (error) {
      setErrorMessage('Error while updating blog')
      setError(true)
      setTimeout(() => {
        setErrorMessage('')
        setError(false)
      }, 5000)
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username} 
      password={password} 
      handleUsernameChange={({target }) => setUsername(target.value)}
      handlePasswordChange={({target}) => setPassword(target.value)}
      handleSubmit={handleLogin}/>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add a new blogpost" hidebutton={'cancel'} ref={blogFormRef}>
      <BlogForm createBlogPost={handleCreate}/>
    </Togglable>
  )

  const blog = () => (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} blogUpdate={blogUpdate} blogRemoval={blogRemoval} currUser={user} />)
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errMessage} error={isError}/>
      {user === null ? 
        loginForm() :
        <div>
          <form onSubmit={handleLogout}>
            <p>Logged in as {user.name}<button type="submit">logout</button></p>
          </form>
          {blog()}
          <h1>Add a new blog</h1>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App