require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const express = require('express')

blogRouter.use(express.json())

blogRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async(req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async(req, res) => {
  const deletedPerson = await Blog.findByIdAndRemove(req.params.id)
  if (deletedPerson === null) throw 'person was already deleted'
  res.status(204).end()
})

blogRouter.put('/:id', async(req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogRouter