const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();

app.use(express.json())

morgan.token('post-data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.use(cors())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  }
]

app.get('/info', (req,res) => {
    res.contentType('text/plain')
    res.send(`Phonebook has info for ${persons.length} people
    
    
${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    if (persons.find(person => person.id === id)) {
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
    } else {
        res.status(400).json({error: 'person not found'})
    }
})

app.post('/api/persons', (req,res) => {
    const person = req.body

    // error handling
    if (!person) {
        return res.status(400).json({
            error: 'content missing'
        })
    } else if (person.name == null) {
        return res.status(400).json({
            error: 'name must not be null'
        })
    } else if (person.number == null) {
        return res.status(400).json({
            error: 'number must not be null'
        })
    } else if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = Math.floor(Math.random() * 1000000000)
    persons.push(person)

    res.json(person)
})

const PORT = process.env.PORT || 3600
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})