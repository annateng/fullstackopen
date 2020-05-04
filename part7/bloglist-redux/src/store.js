import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import displayReducer from './reducers/displayReducer'
import allUsersReducer from './reducers/allUsersReducer'
import thunk from 'redux-thunk'


const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: userReducer,
  display: displayReducer,
  users: allUsersReducer
})

export default createStore(reducer, applyMiddleware(thunk))