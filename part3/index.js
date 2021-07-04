/* eslint-env es6 */
require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

const requestLogger = (req, res, next) => {
  console.log(req.method, req.body)
  next()
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))
morgan.token('type', function (req, res) { return JSON.stringify(req.body)})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(results => {
    results.map(result => result)
    const keys = Object.keys(results)
    res.send(`<p>Phonebook has info for ${keys.length} people.</p>` + Date())
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }
      else{
        res.status(404).end()
      }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body
  const person = new Person({
    id: genId(),
    name: body.name,
    number: body.number
    })

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, {new: true})
  .then(updatedPerson => {
    res.json(updatedPerson)
  })
  .catch(error => next(error))
})

const genId = () => {
  return (Math.floor(Math.random() * 99999))
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if(error.name === 'CastError'){
    return res.status(400).send({error: 'malformatted id'})
  }
  if(error.name === 'ValidationError'){
    return res.status(400).send({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})