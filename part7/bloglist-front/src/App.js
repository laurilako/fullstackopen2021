import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import { setNotification } from './reducers/notificationReducer'
import { addNewBlog, deleteBlog, initBlogs, likeBlog } from './reducers/blogReducer'
import { setExistingUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
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
        <LoginForm/> :
        <div>
          <LogoutForm username={user.name}/>
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