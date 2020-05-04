require('express-async-errors')
const express = require('express')
const blogRouter = express.Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.use(express.json())

blogRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate({ path: 'comments', model: 'Comment' })
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async(req, res) => {
  const blog = new Blog(req.body)

  // add user info to each saved blog
  if (!req.tokenUserId) return res.status(401).json({ error: 'missing or invalid authentication'})
  const user = await User.findById(req.tokenUserId)
  blog.user = user._id

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

  // add blog to list of user's blogs
  user.blogs.push(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async(req, res) => {
  const blogToRemove = await Blog.findById(req.params.id)
  // blog can only be deleted by its creator
  if (!req.tokenUserId || req.tokenUserId !== blogToRemove.user.toString()) return res.status(401).send('user unauthorized to delete blog')

  const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
  if (deletedBlog === null) return res.status(404).send('blog not found')
  res.status(204).end()
})

blogRouter.put('/:id', async(req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user', { username: 1, name: 1 }).populate({ path: 'comments', model: 'Comment' })
  res.json(updatedBlog.toJSON())
})

blogRouter.post('/:id/comments', async(req, res) => {
  const comment = new Comment(req.body)

  const blog = await Blog.findById(req.params.id)
  comment.blog = blog._id
  const savedComment = await comment.save()

  blog.comments.push(savedComment._id)
  const savedBlog = await blog.save()
  await savedBlog.populate({ path: 'comments', model: 'Comment' }).execPopulate()

  res.status(201).json(savedBlog.toJSON())
})

module.exports = blogRouter