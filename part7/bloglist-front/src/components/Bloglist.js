import React, { useRef } from 'react'
import LogoutForm from './LogoutForm'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { addNewBlog, initBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.div`
display: flex;
justify-content: center;
`

const Bloglist = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog(blogObject))
    dispatch(setNotification(`A new blog '${blogObject.title}' by ${blogObject.author} added`, false, 5))
    dispatch(initBlogs())
  }

  return(
    <Page>
      <div>
        <LogoutForm />
        <h1>BLOGS</h1>
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
    </Page>
  )
}


export default Bloglist