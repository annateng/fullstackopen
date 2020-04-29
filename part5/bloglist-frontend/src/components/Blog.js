import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogServiceUpdate, blogServiceDelete }) => {

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

    blogServiceUpdate(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    blogServiceDelete(blog)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div className='likes'>likes: {blog.likes} <button onClick={updateLikes}>like</button></div>
      <div>{blog.user.username}</div>
      <button onClick={deleteBlog}>delete</button>
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
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
  blogServiceUpdate: PropTypes.func.isRequired,
  blogServiceDelete: PropTypes.func.isRequired
}

export default Blog
