const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRouter') // routers
const middleware = require('./utils/middleware')

// connect to mongoose server
mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('connected to mongodb'))
  .catch((error) => logger.error('error connecting to mongodb', error.message))

app.use(express.json())
app.use(cors())
// use morgan to log requests
morgan.token('post-data', req => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app