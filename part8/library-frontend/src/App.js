
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries/queries'

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCache(subscriptionData)
    }
  })

  const updateCache = subscriptionData => {
    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    if (!booksInStore.allBooks.map(b => b.id).includes(subscriptionData.data.bookAdded.id)) {
      client.writeQuery({ query: ALL_BOOKS , data: { allBooks: [...booksInStore.allBooks, subscriptionData.data.bookAdded] } }) 
    }

    const favGenre = user.data && user.data.me ? user.data.me.favoriteGenre : '' 
    const booksByFavGenre = client.readQuery({ query: ALL_BOOKS, variables: { genre: favGenre } })
    if (!booksByFavGenre.allBooks.map(b => b.id).includes(subscriptionData.data.bookAdded.id)) {
      client.writeQuery({ query: ALL_BOOKS, variables: { genre: favGenre }, data: { allBooks: [...booksByFavGenre.allBooks, subscriptionData.data.bookAdded] } })
    }
  }

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
      <NewBook show={page === 'add'} user={user} />
      <Login show={page === 'login'} setUser={setUsername} setPage={setPage} />
      {user && user.data && user.data.me && <Recommendations show={page === 'recommendations'} user={user} />}
    </div>
  )
}

export default App