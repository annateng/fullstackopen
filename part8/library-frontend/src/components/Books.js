import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }
  if (books.loading) return <div>...loading books</div>
  if (books.error) return <div>...{books.error.message}</div>
  
  return (
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
    </div>
  )
}

export default Books