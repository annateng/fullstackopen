import React from 'react'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{ user.name }</h2>
      <b>added blogs</b>
      { user.blogs.map(blog => <li key={blog.id}>{ blog.title }</li>) }
    </div>
  )
}

export default User