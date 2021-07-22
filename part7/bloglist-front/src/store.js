import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import dataReducer from './reducers/dataReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
  data: dataReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store