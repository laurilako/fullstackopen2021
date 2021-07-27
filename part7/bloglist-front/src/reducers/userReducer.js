import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN': {
    return action.data
  }
  case 'LOGOUT': {
    return null
  }
  default:
    return state
  }
}

export const setExistingUser = () => {
  const loggedUser = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUser){
    const user = JSON.parse(loggedUser)
    blogService.setToken(user.token)
    return {
      type: 'LOGIN',
      data: user,
    }
  }
  return { type: 'LOGOUT' }
}

export const logOut = () => {
  window.localStorage.clear()
  return {
    type: 'LOGOUT',
  }
}

export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setExistingUser())
      dispatch(setNotification('Successful login!', false, 3))
    } catch (error) {
      dispatch(setNotification('Invalid username or password!', true, 5))
    }
  }
}

export default userReducer