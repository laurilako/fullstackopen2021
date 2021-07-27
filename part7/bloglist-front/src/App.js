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
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  background: #fffbf0;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
}
`

const Navigation = styled.div`
text-decoration: ;
display: flex;
justify-content: center;
background: #e4ddf4;
padding: 1em;
font-weight: bold;
`

const Page = styled.div`
display: flex;
justify-content: center;
`

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
      <GlobalStyle />
      <Navigation>
        <Nav />
      </Navigation>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <Page>
            <User userdata={userdata} />
          </Page>
        </Route>
        <Route path='/blogs/:id'>
          <LogoutForm />
          <Page>
            <Blog blog={blogdata} />
          </Page>
        </Route>
        <Route path='/users'>
          <Page>
            <Users />
          </Page>
        </Route>
        <Route path='/login'>
          <Page>
            {!user ? <LoginForm /> : <Redirect to='/' /> }
          </Page>
        </Route>
        <Route path='/'>
          <Page>
            {user ? <Bloglist /> : <Redirect to='/login' /> }
          </Page>
        </Route>
      </Switch>
    </div>
  )
}
export default App