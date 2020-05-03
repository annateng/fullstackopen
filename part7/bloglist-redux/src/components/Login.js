import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import { setUser } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const loginInfo = {
        username: e.target.username.value,
        password: e.target.password.value
      }

      const user = await loginService.login(loginInfo)
      dispatch(setMessage(''))
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))

    } catch (err) {
      dispatch(setMessage('Wrong Credentials'))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>username:
        <input id='username' name='username' type='text' defaultValue='' />
      </label>
      <label>password:
        <input id='password' name='password' type='text' defaultValue='' />
      </label>
      <input type='submit' value='login'/>
    </form>
  )
}

export default Login