import React from 'react'

const FullBlog = ({blog, sendLike, removeBlog, user}) => {
  return(
    <div className='blog-full'>
      <div>{blog.url}</div>
      <div id='likesDiv'>Likes: {blog.likes} <button id='likebutton' onClick={sendLike}>like</button>
      </div>
      <div>Added by: {blog.user.name}</div>
      {user.username === blog.user.username ? <button id='removebutton' onClick={removeBlog}>remove</button> : null}
    </div>
  )
}

export default FullBlog