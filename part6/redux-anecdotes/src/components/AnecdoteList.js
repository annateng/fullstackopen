import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)))

  const handleVote = anecdote => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted "${anecdote.content}"`, 3))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {handleVote(anecdote)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList