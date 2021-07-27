import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const padding = {
    padding: 5
  }
  return(
    <div>
      <Link style={padding} to='/'>BLOGS</Link>
      <Link style={padding} to='/users'>USERS</Link>
    </div>
  )
}

export default Nav