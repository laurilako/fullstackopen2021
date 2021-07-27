import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, createComment, initBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const FullBlog = ({ blog }) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')

  const handleCommentCreation = () => {
    dispatch(createComment(blog.id, comment))
    setComment('')
    dispatch(initBlogs())
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`Blog '${blog.title}' by ${blog.author} removed`, false, 5))
      history.push('/')
    }
  }
  
  const handleSendLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked blog '${blog.title}' by ${blog.author}`, false, 5))
  }

  if(!blog){
    return null
  }

  return(
    <div className='blog-full'>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div id='likesDiv'>Likes: {blog.likes} <button id='likebutton' onClick={handleSendLike}>like</button>
      </div>
      <div>Added by: {blog.user.name}</div>
      {user.username === blog.user.username ? <button id='removebutton' onClick={handleRemove}>remove</button> : null}
      <h3>Comments</h3>
      <form onSubmit={handleCommentCreation}>
        <input id='comment' type='text' value={comment} onChange={({target }) => setComment(target.value)}/>
        <button type='submit'>Add comment</button>
      </form>
      {blog.comments.map((o, index) => 
        <div key={index}>
          <li>{o}</li>
        </div>
      )}
    </div>
  )
}

export default FullBlog