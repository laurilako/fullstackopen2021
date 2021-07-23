import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'

const BlogForm = ({ createBlogPost }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthChange = (e) => {
    setAuthor(e.target.value)
  }
    
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlogPost({
      title: title,
      author: author,
      url: url
    })
    setUrl('')
    setTitle('')
    setAuthor('')
    dispatch(initBlogs())
  } 

  return(
    <div className='blogformDiv'>
      <form onSubmit={addBlog}>
        <div>title: <input id='title' type="text" value={title} onChange={handleTitleChange}/></div>
        <div>author: <input id='author' type="text" value={author} onChange={handleAuthChange}/></div>
        <div>url: <input id='url' type="text" value={url} onChange={handleUrlChange}/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlogPost: propTypes.func.isRequired
}

export default BlogForm