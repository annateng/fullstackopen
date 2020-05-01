import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const handleVote = anecdote => {
    props.vote(anecdote.id)
    props.setNotification(`you voted "${anecdote.content}"`, 3)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))
  }
}

const mapDispatchToProps =  {
  vote: id => vote(id),
  setNotification: (notif, timeout) => setNotification(notif, timeout)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)