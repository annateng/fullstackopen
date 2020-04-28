import React, { useState } from 'react'

const BlogForm = ({ blogServiceCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url
    }

    blogServiceCreate(blog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <label>title: <input id='title' type='text' value={title} onChange={event => setTitle(event.target.value)} /></label><br />
      <label>author: <input id='author' type='text' value={author} onChange={event => setAuthor(event.target.value)} /></label><br />
      <label>url: <input id='url' type='text' value={url} onChange={event => setUrl(event.target.value)} /></label><br />
      <input type='submit' value='create' />
    </form>
  )
}

export default BlogForm