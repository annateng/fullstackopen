require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const express = require('express')

blogRouter.use(express.json())

blogRouter.get('/', async(request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async(request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

module.exports = blogRouter