import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'

const LogOutForm = () => {
  let history = useHistory()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logOut())
    history.push('/')
  }
  if (!user) {
    return null
  }
  return(
    <form onSubmit={handleLogout}>
      <p>Logged in as {user.name}<button type="submit">logout</button></p>
    </form>
  )
}

export default LogOutForm