import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries/queries'

const Recommendations = ({ user, show }) => {
  const [getBooks, books] = useLazyQuery(ALL_BOOKS)
  // const [getUser, user] = useLazyQuery(ME)
  useEffect(() => {
    if (user && user.data && user.data.me) getBooks({ variables: { genre: user.data.me.favoriteGenre } })
  }, [user, getBooks])
  
  if (!show) return null
  if (user.loading || books.loading) return <div>...loading</div>
  if (user.error || books.error) return <div>...{user.error.message || books.error.message}</div>
  
  return (
    <div>
      
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></div>
      
      {books.data && (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.data.allBooks.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>)}
    </div>
  )
}

export default Recommendations