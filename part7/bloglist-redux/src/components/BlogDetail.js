import React from 'react'

const BlogDetail = ({ blog, updateLikes }) => {
  const handleLike = () => {
    updateLikes(blog)
  }
  if (!blog) return null
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{ blog.url }</a>
      <div>{blog.likes} likes <button onClick={handleLike}>like</button> </div>
      added by {blog.user.name}
    </div>
  )
}

export default BlogDetail