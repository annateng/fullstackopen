import React from 'react'
import { blogService, loginService } from '../services/serviceMaker'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import { setUser } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import { Container, Button, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    backgroundColor: 'mistyRose',
    borderRadius: 15
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  }
}))

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const loginInfo = {
        username: e.target.username.value,
        password: e.target.password.value
      }

      const user = await loginService.create(loginInfo)
      dispatch(setMessage(''))
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      history.push('/')
    } catch (err) {
      console.log(err)
      dispatch(setMessage('Wrong Credentials'))
    }
  }

  return (
    <Container className={classes.paper} variant='outlined' maxWidth='xs' >
      <form onSubmit={handleLogin} className={classes.form}>
        <TextField id='username' name='username' type='text' defaultValue='' label='username' margin='normal' fullWidth />
        <TextField id='password' name='password' type='text' defaultValue='' label='password' margin='normal' fullWidth />
        <Button type='submit' value='login' variant='outlined' color='primary'>login</Button>
      </form>
    </Container>
  )
}

export default Login