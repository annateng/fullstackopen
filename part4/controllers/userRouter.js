require('express-async-errors')
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = express.Router()

userRouter.use(express.json())

userRouter.get('/', async(req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async(req, res) => {
  const body = req.body

  // if password length is too short, bad request
  if (!body.password || body.password.length < 3) return res.status(400).send('password must be at least 3chars long')

  // get password hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name || '',
    passwordHash
  })

  const savedUser = await newUser.save()
  res.status(201).json(savedUser.toJSON())
})

module.exports = userRouter
