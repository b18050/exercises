require('dotenv').config()
const express = require('express')
const app = express()

const Person = require('./models/person')

const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())  
// app.use(logger)  //request.body is empty!

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host')) // This is a modified version of morgan's tiny predefined format string.

morgan.token('host', function(req) {
  const person = {
    name:req.body.name,
    number: req.body.number
  }

  return (JSON.stringify(person))
})

app.get('/',(request,response) => {
  response.send('<h2> Hello World </h2>')
})

app.get('/api/persons',(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  
  const body = request.body
  console.log(body)
  
  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })


  person.save()
    .then(savedPerson => {
      console.log(savedPerson)
      response.json(savedPerson)
    })
    .catch(error => next(error))
  

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body)

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id , person, {new:true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//handler of requests with unknown endpoint
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT ,() => {
  console.log(`Server running at port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({error: 'malformatted id'})
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({error : error.message })
  }

  next(error)
}

//handler of requests with result to errors
app.use(errorHandler)