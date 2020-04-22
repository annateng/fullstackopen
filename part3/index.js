require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// create an express application
const app = express()

// use json parser
app.use(express.json())
// search for static files in ./build/
app.use(express.static('build'))

// use morgan to log requests
morgan.token('post-data', req => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
)

// use cors to handle cross origin resource sharing
app.use(cors())

// info page. shows phonebook length and date
app.get('/info', (req, res) => {
  Person.countDocuments({}).then((count) => {
    res.contentType('text/plain')
    res.send(`Phonebook has info for ${count} people
${new Date()}`)
  })
})

// get entire phonebook
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()))
  })
})

// get single person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person.toJSON())
      else res.status(404).end('person not found')
    })
    .catch((error) => next(error))
})

// delete entry
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(person => {
      if (person === null) throw 'person was already deleted'
      res.status(204).end()
    })
    .catch((error) => next(error))
})

// add person to the database
app.post('/api/persons', (req, res, next) => {
  const personData = req.body

  const person = new Person({
    name: personData.name,
    number: personData.number,
    id: Math.floor(Math.random() * 1000000000),
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

// update existing database entry
app.put('/api/persons/:id', (req, res, next) => {
  const personData = req.body

  Person.findByIdAndUpdate(req.params.id, personData, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError')
    return res.status(400).send({ error: 'malformed id' })
  else if (error.name === 'ValidationError')
    return res.status(400).send({ error: error.message })

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3601
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
