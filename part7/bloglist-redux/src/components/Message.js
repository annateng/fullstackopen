import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => state.message.message)

  const msgStyle = {
    backgroundColor: 'powderblue',
    color: 'darkgoldenrod',
    font: 'italic bold 18px Arial, sans-serif',
    fontSize: '18px',
    border: 'solid',
    borderRadius: '10px',
    borderColor: 'darkgoldenrod',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!message || message === '') return null
  else return <div className='message' style={msgStyle}>{message}</div>
}

export default Message