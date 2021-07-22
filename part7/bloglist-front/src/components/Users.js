import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LogOutForm from './LogoutForm'
import { Link } from 'react-router-dom'
import { initData } from '../reducers/dataReducer'


const Users = () => {
  const data = useSelector(state => state.data)
  const dispatch = useDispatch()
  useEffect (() => {
    dispatch(initData())
  }, [dispatch])
  if (!data) {
    return null
  }
  return(
    <div>
      <LogOutForm />
      <h1>Users</h1>
      {data.map(user =>
        <div key={user.id}>
          <p><Link to={`/users/${user.id}`}>{user.name}</Link> Blogs created by user: {user.blogs.length}</p>
        </div>
      )}
    </div>
  )
}




export default Users