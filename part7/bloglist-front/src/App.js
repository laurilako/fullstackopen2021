import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { addNewBlog, deleteBlog, initBlogs, likeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const blogFormRef = useRef()

  useEffect (() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(initBlogs())
    }
  }, [dispatch])

  useEffect(()=> {
    if(refresh === true){
      dispatch(initBlogs())
    }
    setRefresh(false)
  }, [refresh])

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog(blogObject))
    setRefresh(true)
    dispatch(setNotification(`A new blog '${blogObject.title}' by ${blogObject.author} added`, 5))
    dispatch(initBlogs())
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
      dispatch(initBlogs())
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  const blogRemoval = (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`Blog '${blog.title}' by ${blog.author} removed`, 5))
  }

  const blogUpdate = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked blog '${blog.title}' by ${blog.author}`, 5))
  }

  const blog = () => (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} blogUpdate={blogUpdate} blogRemoval={blogRemoval} currUser={user} />)
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification/>
      {user === null ? 
        <LoginForm
          username={username} 
          password={password} 
          handleUsernameChange={({target }) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleSubmit={handleLogin}/> :
        <div>
          <form onSubmit={handleLogout}>
            <p>Logged in as {user.name}<button type="submit">logout</button></p>
          </form>
          {blog()}
          <h1>Add a new blog</h1>
          <Togglable buttonLabel="Add a new blogpost" hidebutton={'cancel'} ref={blogFormRef}>
            <BlogForm createBlogPost={handleCreate}/>
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App