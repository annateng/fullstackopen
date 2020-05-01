import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  const compareVotes = (a1, a2) => a2.votes - a1.votes

  switch (action.type) {
    case 'VOTE': {
      return [...state.filter(a => a.id !== action.data.id), action.data].sort(compareVotes)
    }
    case 'NEW': {
      return [...state, action.data].sort(compareVotes)
    }
    case 'INITIALIZE': {
      return action.data.sort(compareVotes)
    }
    default: return state.sort(compareVotes)
  }
}

export const vote = id => {
  return async dispatch => {
    const resGet = await axios.get(`${baseUrl}/${id}`)
    const newA = {...resGet.data, votes: resGet.data.votes + 1}
    const resPut = await axios.put(`${baseUrl}/${id}`, newA)
    dispatch({
      type: 'VOTE',
      data: resPut.data
    })
  }
}

export const createAnecdote = anecdoteContent => {
  const anecdote = {
    content: anecdoteContent,
    votes: 0
  }
  
  return async dispatch => {
    const res = await axios.post(baseUrl, anecdote)
    dispatch({
      type: 'NEW',
      data: res.data
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const res = await axios.get(baseUrl)
    dispatch({
      type: 'INITIALIZE',
      data: res.data
    })
  }
}

export default reducer