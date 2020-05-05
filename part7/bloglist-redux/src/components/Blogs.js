import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, Link, ExpansionPanelDetails, Typography, Button, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  detail: {
    flexDirection: 'column'
  },
}))

const compareBlogs = (b1, b2) => {
  if (b1.likes === b2.likes) return b1.title < b2.title ? -1 : 1
  return b2.likes - b1.likes
}

const Blogs = ({ blogs, blogServiceDelete, updateLikes }) => {
  const classes = useStyles()
  const deleteBlog = blog => {
    blogServiceDelete(blog)
  }

  return (
    <div>
      { blogs.sort((b1, b2) => compareBlogs(b1, b2)).map(blog => 
        <ExpansionPanel key={blog.id}>
          <ExpansionPanelSummary>
            <Link variant='body1' component={RouterLink} to={`/blog/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Link href={blog.url} variant='body2'>url: {blog.url}</Link>
            <div><Typography variant='body2' align='left'>likes: {blog.likes}</Typography></div>
            <div><Typography variant='body2' align='left'>added by: {blog.user.username}</Typography></div>
            <Button color='primary' onClick={() => updateLikes(blog)}>like</Button>
            <Button color='secondary' onClick={() => deleteBlog(blog)}>delete</Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </div>
  )
}

export default Blogs