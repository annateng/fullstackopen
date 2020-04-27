import React from 'react'
import blogService from '../services/blogs'

const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, blogs, setBlogs, setMessage}) => {
  const createBlog = (event) => {
    event.preventDefault()
    blogService.create(title, author, url)
      .then(res => {
        setBlogs(blogs.concat(res))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(err => {
        setMessage('no blog was created')
      })
  }
  
  return (
    <form onSubmit={createBlog}>
      <label>title: <input type='text' value={title} onChange={event => setTitle(event.target.value)} /></label><br />
      <label>author: <input type='text' value={author} onChange={event => setAuthor(event.target.value)} /></label><br />
      <label>url: <input type='text' value={url} onChange={event => setUrl(event.target.value)} /></label><br />
      <input type='submit' value='create' />
    </form>
  )
}

export default BlogForm