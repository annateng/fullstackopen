import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

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
      .then(() => {
        setMessage(`updated likes for ${blog.title} by ${blog.author}`)
        const oldBlog = Object.assign({}, blog) // shallow copy. don't mutate blog directly
        oldBlog.likes++
        setBlogs(blogs.filter(b => b.id !== blog.id).concat(oldBlog))
      })
      .catch(err => {
        setMessage('error updating likes')
        console.error(err)
      })
  }

  const deleteBlog = () => {
    if (window.confirm(`do you want to delete ${blog.name} by ${blog.author}?`)) {
      blogService.deleteEntry(blog.id)
        .then(() => {
          setMessage(`${blog.title} by ${blog.author} has been deleted`)
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
        .catch(err => {
          setMessage(`error deleting blog ${blog.title} by ${blog.author}`)
          console.error(err)
        })
    }
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes} <button onClick={updateLikes}>like</button></div>
      <div>{blog.user.username}</div>
      <button onClick={deleteBlog}>delete</button>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog
