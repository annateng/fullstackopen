
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { ME } from './queries/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [username, setUsername] = useState('')
  const client = useApolloClient()
  const [getUser, user] = useLazyQuery(ME)

  useEffect(() => {
    localStorage.clear()
  }, [])

  useEffect(() => {
    getUser()
  }, [username, getUser])

  const handleLogout = e => {
    setUsername('')
    localStorage.removeItem('token')
    client.resetStore()
    setPage('authors')
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {username && <button onClick={() => setPage('add')}>add book</button>}
        {!username && <button onClick={() => setPage('login')}>login</button>}
        {username && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {username && <button onClick={handleLogout}>logout</button>}
        {username && <span>{username} is logged in </span>}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} setUser={setUsername} setPage={setPage} />
      {user && user.data && user.data.me && <Recommendations show={page === 'recommendations'} user={user} />}
    </div>
  )
}

export default App