
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleLogout = e => {
    setUser('')
    localStorage.removeItem('token')
    client.resetStore()
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user && <button onClick={() => setPage('add')}>add book</button>}
        {!user && <button onClick={() => setPage('login')}>login</button>}
        {user && <button onClick={handleLogout}>logout</button>}
        {user && <span>{user} is logged in</span>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'} setUser={setUser} setPage={setPage}
      />

    </div>
  )
}

export default App