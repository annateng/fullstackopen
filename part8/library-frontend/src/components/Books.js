import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries/queries'

const Books = (props) => {
  const genres = useQuery(ALL_GENRES)
  const [getBooks, books] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  useEffect(() => {
    getBooks()
  }, [getBooks])

  if (!props.show) {
    return null
  }
  if (books.loading || genres.loading) return <div>...loading</div>
  if (books.error || genres.error) return <div>...{books.error.message || genres.error.message}</div>

  const filterBooks = e => {
    getBooks({ variables: { genre: e.target.value } })
    setGenre(e.target.value)
  }
  
  return (
    <div>
      <h2>books</h2>
      <select onChange={filterBooks} value={genre}>
        <option></option>
        {genres.data.allGenres.map(g => <option key={g}>{g}</option>)}
      </select>
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