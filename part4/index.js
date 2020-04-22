const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRouter')

app.use('/api/blogs', blogRouter)
app.use(express.json())
app.use(cors())

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('connected to mongodb'))
  .catch(error => logger.error('error connecting to mongodb', error.message))

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})