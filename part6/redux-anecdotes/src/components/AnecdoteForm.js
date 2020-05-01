import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
  const create = e => {
    e.preventDefault()
    props.createAnecdote(e.target.anecdote.value)
    e.target.anecdote.value = ''
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

const mapDispatchToProps = {
  createAnecdote: content => createAnecdote(content)
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)