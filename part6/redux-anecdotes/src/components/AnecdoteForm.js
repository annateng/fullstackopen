import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import axios from 'axios'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = e => {
    e.preventDefault()
    const newA = {
      content: e.target.anecdote.value,
      votes: 0
    }
    axios.post('http://localhost:3001/anecdotes', newA).then(res => { dispatch(createAnecdote(res.data)) })
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm