import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/queries'

const Authors = (props) => {
  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {if (authors.data) setAuthorName(authors.data.allAuthors[0].name)}, [authors.data])

  const handleUpdateAuthor = () => {
    if (!authorBorn) return console.error('Must set author birth year')
    const name = authorName
    const setBornTo = authorBorn
    updateAuthor({ variables: {name, setBornTo} })
  }
  
  if (!props.show) {
    return null
  }
  if (authors.loading) return <div>loading authors...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <div>
        name 
        <select onChange={e => setAuthorName(e.target.value)}>
          {authors.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>)}
        </select>
      </div>
      <div>
          born
          <input
            type='number'
            value={authorBorn}
            onChange={e => setAuthorBorn(e.target.value ? parseInt(e.target.value) : '')}
          />
      </div>
      <button type='button' onClick={handleUpdateAuthor}>update author</button>
    </div>
  )
}

export default Authors
