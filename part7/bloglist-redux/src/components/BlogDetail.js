import React from 'react'
import getService from '../services/serviceMaker'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { Button, TextField, Typography, Link, ListItemText, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(2)
  }
}))

const BlogDetail = ({ blogId, updateLikes }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))
  if (!blog) return null

  const handleLike = () => {
    updateLikes(blog)
  }

  const handleComment = e => {
    e.preventDefault()
    const commentService = getService(`/api/blogs/${blog.id}/comments`)
    const newComment = { content: e.target.comment.value }

    commentService.create(newComment).then(res => {
      dispatch(updateBlog(res)) })
    e.target.comment.value = ''
  }

  return (
    <div>
      <Typography variant='h3'>{blog.title}</Typography>
      <Link variant='body1' href={blog.url}>{ blog.url }</Link>
      <Typography variant='body1'>{blog.likes} likes </Typography>
      <Typography variant='body1'>added by {blog.user.name}</Typography>
      <Button variant='contained' onClick={handleLike}>like</Button>
      <Typography variant='h4'>comments</Typography>
      <form onSubmit={handleComment}>
        <TextField name='comment' type='text' />
        <Button className={classes.button} variant='contained' type='submit'>add comment</Button>
      </form>
      {blog.comments.map(comment => <ListItemText variant='body1' key={comment.id}>• {comment.content}</ListItemText>)}
    </div>
  )
}

export default BlogDetail