import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const updatedBlog = state.map(o => o.id === action.data.id ? action.data : o)
    return updatedBlog
  }
  case 'DELETE': {
    const updatedBlog = state.filter(o => o.id !== action.data)
    return updatedBlog
  }
  case 'NEW':
    return [ ...state, action.data ]
  default:
    return state
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

export const likeBlog = (id, blogObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type: 'DELETE',
      data: id
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