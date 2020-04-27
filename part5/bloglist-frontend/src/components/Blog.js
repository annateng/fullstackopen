import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setMessage, blogs, setBlogs }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    padding: 5,
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5
  }

  const updateLikes = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService.update(blog.id, updatedBlog)
      .then(res => {
        setMessage(`updated likes for ${blog.title} by ${blog.author}`)
        const oldBlog = Object.assign({}, blog)
        oldBlog.likes++
        setBlogs(blogs.filter(b => b.id !== blog.id).concat(oldBlog))
      })
      .catch(err => {
        setMessage(`error updating likes`)
        console.error(err)
      })
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes} <button onClick={updateLikes}>like</button></div>
      <div>{blog.user.username}</div>
    </div>
  )

  return (
    <div style={blogStyle}>
      <span>{blog.title} by {blog.author}</span>
      <button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'hide' : 'show'}
      </button>
      { showDetail ? details() : null }
    </div>
  )
}

export default Blog
