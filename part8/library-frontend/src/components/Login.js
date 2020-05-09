import React, { useState } from 'react'
import { LOGIN } from '../queries/queries'
import { useMutation } from '@apollo/client'

const Login = ({ show, setUser, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, user] = useMutation(LOGIN)

  if (!show) return null
  
  const handleLogin = e => {
    e.preventDefault()

    login({ variables: { username, password } })
      .then(res => {
        setUser(username)
        localStorage.setItem('token', res.data.login.value)
        setPage('authors')
      })
      .catch(err => {
        console.error(err.message)
      })

    setUsername('')
    setPassword('')
  }
  
  return (
    <div>
      {user.error && <div>...{user.error.message}</div>}
      {user.loading && <div>...loading</div>}
      <form onSubmit={handleLogin}>
      <div>username: <input name='username' onChange={e => setUsername(e.target.value)} /></div>
      <div>password: <input name='password' onChange={e => setPassword(e.target.value)} /></div>
      <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login