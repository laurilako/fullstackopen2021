import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.div`
display: flex;
justify-content: center;
`

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
    <Page>
      <form onSubmit={handleLogout}>
        <p>Logged in as {user.name}<button type="submit">logout</button></p>
      </form>
    </Page>
  )
}

export default LogOutForm