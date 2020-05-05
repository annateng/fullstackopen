import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleNewBlog } from '../reducers/displayReducer'
import { TextField, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  text: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(2),
    backgroundColor: 'mistyrose'
  }
}))

const BlogForm = ({ blogServiceCreate }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const createBlog = e => {
    e.preventDefault()

    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }

    blogServiceCreate(blog)
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
  }

  const toggleVisibility = () => { dispatch(toggleNewBlog()) }

  return (
    <form onSubmit={createBlog}>
      <TextField label='title' id='title' name='title' type='text' defaultValue='' className={classes.text} />
      <TextField label='author' id='author' name='author' type='text' defaultValue='' className={classes.text} />
      <TextField label='url' id='url' name='url' type='text' defaultValue='' className={classes.text} />
      <Button type='submit' value='create' variant='outlined' className={classes.button}>create</Button>
      <Button type='button' variant='outlined' onClick={toggleVisibility} className={classes.button}>cancel</Button>
    </form>
  )
}

export default BlogForm