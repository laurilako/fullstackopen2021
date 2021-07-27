import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const updatedBlog = state.map(o => o.id === action.data.id ? action.data : o)
    return updatedBlog
  }
  case 'COMMENT': {
    const updatedBlog = state.map(o => o.id === action.data.id ? action.data : o)
    return updatedBlog
  }
  case 'DELETE': {
    const updatedBlog = state.filter(o => o.id !== action.data.id)
    return updatedBlog
  }
  case 'NEW':
    return [ ...state, action.data ]
  default:
    return state
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    const newComment = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT',
      data: newComment
    })
  }
}

export const addNewBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  blog = { ...blog, likes: blog.likes + 1}
  return async dispatch => {
    await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.removeBlog(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer