const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const middleware = require('./utils/middleware')

// handle deprecationwarning collection.ensureIndex
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

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
if (config.USE_LOGGER) {
  morgan.token('post-data', req => JSON.stringify(req.body))
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :post-data'
    )
  )
}

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
if (config.USE_TEST) {
  const testingRouter = require('./controllers/testingRouter')
  app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app