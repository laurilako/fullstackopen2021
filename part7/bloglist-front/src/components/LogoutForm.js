import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const LogOutForm = (username) => {
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logOut())
  }

  return(
    <form onSubmit={handleLogout}>
      <p>Logged in as {username.username}<button type="submit">logout</button></p>
    </form>
  )
}

export default LogOutForm