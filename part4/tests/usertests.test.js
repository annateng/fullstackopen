require('express-async-errors')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('../utils/list_helper')

const api = supertest(app)

/** initialize database */
beforeEach(async() => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    await api
      .post('/api/users')
      .send(user)
  }
})

/** close mongoose connection after tests */
afterAll(() => { mongoose.connection.close() })

/**** BEGIN TESTS ************* */
describe('initialize database with initialUsers works as expected', () => {
  test('get all intial users as expected', async() => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.length).toBe(helper.initialUsers.length)
  })
})

describe('adding new user works properly', () => {
  test('adding valid user works', async() => {
    const validUser = {
      username: 'sallyRocks',
      password: 'c0dybank$',
    }

    const res = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)

    const allUsers = await api
      .get('/api/users')
      .expect(200)

    expect(allUsers.body.length).toBe(helper.initialUsers.length + 1)
    expect(res.body.username).toBe('sallyRocks')
    expect(res.body.name).toBe('')
    expect(res.body.id).toBeDefined
  })

  test('adding user without username fails', async() => {
    const noUsernameUser = {
      name: 'jorge',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(noUsernameUser)
      .expect(400)

    const allUsers = await api
      .get('/api/users')
      .expect(200)

    expect(allUsers.body.length).toBe(helper.initialUsers.length)
  })

  test('adding user with short username fails', async() => {
    const noUsernameUser = {
      username: 'j',
      name: 'jorge',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(noUsernameUser)
      .expect(400)

    const allUsers = await api
      .get('/api/users')
      .expect(200)

    expect(allUsers.body.length).toBe(helper.initialUsers.length)
  })

  test('adding user without password fails', async() => {
    const noPasswordUser = {
      username: 'h0telChantelle123'
    }

    await api
      .post('/api/users')
      .send(noPasswordUser)
      .expect(400)

    const allUsers = await api
      .get('/api/users')
      .expect(200)

    expect(allUsers.body.length).toBe(helper.initialUsers.length)
  })
})



// THERES SOME SUPERTEST BUG WHERE IT WONT CLOSE THE PORT IF THERE'S ONLY ONE CALL TO SUPERTEST