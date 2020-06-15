const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

logger.info('connecting to ',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:',error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :host')) // This is a modified version of morgan's tiny predefined format string.

morgan.token('host', function(req) {
  const person = {
    name:req.body.name,
    number: req.body.number
  }

  return (JSON.stringify(person))
})


module.exports = app



