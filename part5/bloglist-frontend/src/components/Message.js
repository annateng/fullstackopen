import React from 'react'
const Message = ({ message }) => {
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

  if (message === null) return null
  else return <div style={msgStyle}>{message}</div>
}

export default Message