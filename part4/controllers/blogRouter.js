require('express-async-errors')
const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
// const logger = require('../utils/logger')

blogRouter.use(express.json())

blogRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async(req, res) => {
  const blog = new Blog(req.body)

  // add user info to each saved blog
  const user = await User.findById(req.tokenUserId) // tokenUserId is set by tokenExtractor middleware
  blog.user = user._id

  const savedBlog = await blog.save()

  // add blog to list of user's blogs
  user.blogs.push(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async(req, res) => {
  const blogToRemove = await Blog.findById(req.params.id)
  // blog can only be deleted by its creator
  if (!req.tokenUserId || req.tokenUserId !== blogToRemove.user) return res.status(401).send('user unauthorized to delete blog')

  const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
  if (deletedBlog === null) return res.status(404).send('blog not found')
  res.status(204).end()
})

blogRouter.put('/:id', async(req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogRouter