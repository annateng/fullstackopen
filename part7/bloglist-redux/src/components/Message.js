import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  alert: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'mistyRose'
  }
}))

const Message = () => {
  const message = useSelector(state => state.message.message)
  const classes = useStyles()

  // const msgStyle = {
  //   backgroundColor: 'powderblue',
  //   color: 'darkgoldenrod',
  //   font: 'italic bold 18px Arial, sans-serif',
  //   fontSize: '18px',
  //   border: 'solid',
  //   borderRadius: '10px',
  //   borderColor: 'darkgoldenrod',
  //   padding: '10px',
  //   marginBottom: '10px'
  // }

  if (!message || message === '') return null
  else return <div><Alert severity='success' className={classes.alert}>{message}</Alert></div>
}

export default Message