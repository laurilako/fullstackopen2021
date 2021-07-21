import React, { useState } from 'react'
import FullBlog from './FullBlog'

const Blog = ({blog, blogUpdate, blogRemoval, currUser}) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      blogRemoval(blog)
    }
  }

  const handleSendLike = () => {
    const blogObject = { ...blog, likes: blog.likes + 1}
    blogUpdate(blog.id, blogObject)
  }

  return(
    <div className='blog-container' style={blogStyle}>
      <div className='blog-title-author'>
        {blog.title}, written by {blog.author}
      </div>
      <button id='viewbutton' onClick={() => setShowFull(!showFull)}>{showFull ? 'hide' : 'view'}</button>
      {showFull ? (
        <FullBlog blog={blog} sendLike={handleSendLike} user={currUser} removeBlog={handleRemove} />
      ) : null}
    </div>
  )
}
export default Blog