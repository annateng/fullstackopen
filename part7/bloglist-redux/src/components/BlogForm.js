import React from 'react'

const BlogForm = ({ blogServiceCreate }) => {
  const createBlog = e => {
    e.preventDefault()

    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }

    blogServiceCreate(blog)
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
  }

  return (
    <form onSubmit={createBlog}>
      <label>title: <input id='title' name='title' type='text' defaultValue='' /></label><br />
      <label>author: <input id='author' name='author' type='text' defaultValue='' /></label><br />
      <label>url: <input id='url' name='url' type='text' defaultValue='' /></label><br />
      <input type='submit' value='create' />
    </form>
  )
}

export default BlogForm