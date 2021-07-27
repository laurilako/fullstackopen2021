import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Users from './components/Users'
import User from './components/User'
import Nav from './components/Nav'
import { initBlogs } from './reducers/blogReducer'
import { setExistingUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import Bloglist from './components/Bloglist'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  useEffect (() => {
    dispatch(setExistingUser())
  }, [dispatch])

  useEffect(() => {
    if(user){
      dispatch(initBlogs())}
  }, [user])

  const matchUId = useRouteMatch('/users/:id')
  const userdata = matchUId
    ? blogs.filter((o) => o.user.id === matchUId.params.id)
    : null

  const matchBId = useRouteMatch('/blogs/:id')
  const blogdata = matchBId
    ? blogs.find((o) => o.id === matchBId.params.id)
    : null

  return (
    <div>
      <Nav />
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <User userdata={userdata} />
        </Route>
        <Route path='/blogs/:id'>
          <LogoutForm />
          <Blog blog={blogdata} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/login'>
          {!user ? <LoginForm /> : <Redirect to='/' /> }
        </Route>
        <Route path='/'>
          {user ? <Bloglist /> : <Redirect to='/login' /> }
        </Route>
      </Switch>
    </div>
  )
}
export default App