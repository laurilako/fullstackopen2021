import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { addNewBlog, initBlogs } from './reducers/blogReducer'
import { setExistingUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  useEffect (() => {
    dispatch(setExistingUser())
  }, [dispatch])

  useEffect(() => {
    if(user){
      dispatch(initBlogs())}
  }, [user])

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog(blogObject))
    dispatch(setNotification(`A new blog '${blogObject.title}' by ${blogObject.author} added`, 5))
    dispatch(initBlogs())
  }

  const matchUId = useRouteMatch('/users/:id')
  const userdata = matchUId
    ? blogs.filter((o) => o.user.id === matchUId.params.id)
    : null

  const matchBId = useRouteMatch('/blogs/:id')
  const blogdata = matchBId
    ? blogs.find((o) => o.id === matchBId.params.id)
    : null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <User userdata={userdata} />
        </Route>
        <Route path='/blogs/:id'>
          <LogoutForm />
          <Blog blog={blogdata} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          {user === null ? (
            <div>
              <LoginForm />
            </div>
          ) : (
            <div>
              <LogoutForm />
              <div>
                {blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog => 
                    <div key={blog.id} style={blogStyle}>
                      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
                    </div>)}
              </div>
              <h1>Add a new blog</h1>
              <Togglable buttonLabel="Add a new blogpost" hidebutton={'cancel'} ref={blogFormRef}>
                <BlogForm createBlogPost={handleCreate}/>
              </Togglable>
            </div>
          )}
        </Route>
      </Switch>
    </div>
  )
}
export default App