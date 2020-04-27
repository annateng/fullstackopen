import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const loginInfo = {
        username,
        password
      }

      const user = await loginService.login(loginInfo)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (err) {
      setMessage('Wrong Credentials')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>username:
        <input type='text' value={username} onChange={event => setUsername(event.target.value)} />
      </label>
      <label>password:
        <input type='text' value={password} onChange={event => setPassword(event.target.value)} />
      </label>
      <input type='submit' value='login'/>
    </form>
  )
}

export default Login