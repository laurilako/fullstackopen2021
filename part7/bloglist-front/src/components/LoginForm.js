import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn(username, password))
    setUsername('')
    setPassword('')
  }

  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
            username <input id='username' type='text' value={username} onChange={({target }) => setUsername(target.value)}/>
        </div>
        <div>
            password <input id='password' type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button id='loginbutton' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm