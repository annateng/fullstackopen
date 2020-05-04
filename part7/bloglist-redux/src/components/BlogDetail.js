import React from 'react'
import getService from '../services/serviceMaker'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'

const BlogDetail = ({ blogId, updateLikes }) => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))
  if (!blog) return null

  const handleLike = () => {
    updateLikes(blog)
  }

  const handleComment = e => {
    e.preventDefault()
    const commentService = getService(`/api/blogs/${blog.id}/comments`)
    const newComment = { content: e.target.comment.value }

    commentService.create(newComment).then(res => {
      dispatch(updateBlog(res)) })
    e.target.comment.value = ''
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{ blog.url }</a>
      <div>{blog.likes} likes <button onClick={handleLike}>like</button> </div>
      added by {blog.user.name}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input name='comment' type='text' />
        <button type='submit'>add comment</button>
      </form>
      {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
    </div>
  )
}

export default BlogDetail