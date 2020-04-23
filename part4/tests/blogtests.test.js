require('express-async-errors')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

/** INITIALIZE DATABASE */
beforeEach(async() => {
  await Blog.deleteMany({}) // clear blogs database

  for (let blog of helper.biggerList) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

/** BEGIN TESTS */
// check that get request returns correct code and type
test('get request', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// check that id field exists
test('unique identifier field id exists', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

// check that login works
test('login works', async() => {
  const loginInfo = {
    username: helper.initialUsers[0].username,
    password: helper.initialUsers[0].password
  }

  await api
    .post('/api/login')
    .send(loginInfo)
    .expect(200)
})

// check that post request successfully creates new blog
test('post request adds blog', async() => {
  const newBlog = {
    title: 'learn to code',
    author: 'jk rowling',
    url: 'google.com',
    likes: 0
  }

  const loginInfo = {
    username: helper.initialUsers[1].username,
    password: helper.initialUsers[1].password
  }

  const res = await api
    .post('/api/login')
    .send(loginInfo)
    .expect(200)

  const token = res.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.biggerList.length + 1)
  expect(response.body.map(r => r.title)).toContain('learn to code')
})

// check that likes defaults to 0
test('likes default to 0', async() => {
  const newBlog = {
    title: 'no likes',
    author: 'mark zucko',
    url: 'facebook.edu',
  }

  const loginInfo = {
    username: helper.initialUsers[1].username,
    password: helper.initialUsers[1].password
  }

  const res = await api
    .post('/api/login')
    .send(loginInfo)
    .expect(200)

  const token = res.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.biggerList.length + 1)
  expect(response.body.find(b => b.title === 'no likes').likes).toBe(0)
})

// check that if title or url properties are missing, respond with 400 bad request
test('missing title or url 400', async() => {
  const loginInfo = {
    username: helper.initialUsers[1].username,
    password: helper.initialUsers[1].password
  }

  const res = await api
    .post('/api/login')
    .send(loginInfo)
    .expect(200)

  const token = res.body.token

  const noUrl = {
    title: 'no url',
    author: 'mark zucko'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noUrl)
    .expect(400)

  const response1 = await api.get('/api/blogs')
  expect(response1.body).toHaveLength(helper.biggerList.length)

  const noTitle = {
    url: 'www.notitle.com',
    author: 'mark zucko'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noTitle)
    .expect(400)

  const response2 = await api.get('/api/blogs')
  expect(response2.body).toHaveLength(helper.biggerList.length)
})

test('missing token results in 401', async() => {
  const newBlog = {
    title: 'no likes',
    author: 'mark zucko',
    url: 'facebook.edu',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {mongoose.connection.close()})