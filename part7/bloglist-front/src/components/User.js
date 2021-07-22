import React from 'react'
import LogOutForm from './LogoutForm'
import { Link } from 'react-router-dom'

const User = ({ userdata }) => {
  if(!userdata){
    return null
  }
  return(
    <div>
      <LogOutForm />
      <h1>{userdata[0].user.name}</h1>
      <h2>Added blogs</h2>
      {userdata.map(blog => 
        <ul key={blog.id}>
          <li><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        </ul>
      )}
    </div>
  )
}

export default User