import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBlogDetail } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, updateLikes, blogServiceDelete }) => {
  const showDetail = useSelector(state => state.blogs.find(b => b.id === blog.id).showDetail)
  const dispatch = useDispatch()

  const blogStyle = {
    padding: 5,
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5
  }

  const deleteBlog = () => {
    blogServiceDelete(blog)
  }

  const handleLike = () => {
    updateLikes(blog)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div className='likes'>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>{blog.user.username}</div>
      <button onClick={deleteBlog}>delete</button>
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      <Link to={`/blog/${blog.id}`}>{blog.title} by {blog.author}</Link>
      <button onClick={() => dispatch(toggleBlogDetail(blog))}>
        {showDetail ? 'hide' : 'show'}
      </button>
      { showDetail ? details() : null }
    </div>
  )
}

export default Blog
