import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { addNewBlog, deleteBlog, initBlogs, likeBlog } from './reducers/blogReducer'
import { logIn, logOut, setExistingUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect (() => {
    dispatch(setExistingUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog(blogObject))
    dispatch(setNotification(`A new blog '${blogObject.title}' by ${blogObject.author} added`, 5))
    dispatch(initBlogs())
  }

  const handleLogout = () => {
    dispatch(logOut())
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(logIn(username, password))
    setUsername('')
    setPassword('')
  }

  const blogRemoval = (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`Blog '${blog.title}' by ${blog.author} removed`, 5))
    dispatch(initBlogs())
  }

  const blogUpdate = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked blog '${blog.title}' by ${blog.author}`, 5))
    dispatch(initBlogs())
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