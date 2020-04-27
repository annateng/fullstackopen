import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setMessage, setVisible, username}) => {
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

    blogService.create(blog)
      .then(res => {
        setMessage(`new blog created: ${title} by ${author}`)
        res.user = { username }
        setBlogs(blogs.concat(res))
        setTitle('')
        setAuthor('')
        setUrl('')
        setVisible(false)
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