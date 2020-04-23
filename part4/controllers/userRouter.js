require('express-async-errors')
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = express.Router()

userRouter.use(express.json())

userRouter.post('/', async(req, res) => {
  const body = req.body

  // get password hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log(passwordHash)

  const newUser = new User({
    username: body.username,
    name: body.name || '',
    passwordHash: passwordHash
  })

  const savedUser = await newUser.save()
  res.status(201).json(savedUser.toJSON())
})

module.exports = userRouter
