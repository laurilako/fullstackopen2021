import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const FullBlog = ({ blog }) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`Blog '${blog.title}' by ${blog.author} removed`, 5))
      history.push('/')
    }
  }
  
  const handleSendLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked blog '${blog.title}' by ${blog.author}`, 5))
  }

  if(!blog){
    return null
  }
  console.log(blog)
  console.log(blog.user.name)
  return(
    <div className='blog-full'>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div id='likesDiv'>Likes: {blog.likes} <button id='likebutton' onClick={handleSendLike}>like</button>
      </div>
      <div>Added by: {blog.user.name}</div>
      {user.username === blog.user.username ? <button id='removebutton' onClick={handleRemove}>remove</button> : null}
    </div>
  )
}

export default FullBlog