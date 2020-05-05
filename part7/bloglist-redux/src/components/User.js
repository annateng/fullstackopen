import React from 'react'
import { Typography, ListItemText } from '@material-ui/core'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <Typography variant='h3'>{ user.name }</Typography>
      <Typography variant='h4'>added blogs</Typography>
      { user.blogs.map(blog => <ListItemText key={blog.id}>• { blog.title }</ListItemText>) }
    </div>
  )
}

export default User