import React from 'react'
import loginService from '../services/login'

const Login = ({username, setUsername, password, setPassword, setUser, setMessage}) => {
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
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