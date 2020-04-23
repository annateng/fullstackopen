const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')

// const requestLogger = (req, res, next) => {
//   logger.info('Method:', req.method)
//   logger.info('Path:  ', req.path)
//   logger.info('Body:  ', req.body)
//   logger.info('---')
//   next()
// }

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = undefined
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  } else return next() // if no authorization, no need to generate tokenID

  let decodedToken = undefined
  if (token) decodedToken = jwt.verify(token, config.SECRET)

  if (!token || !decodedToken.id) return res.status(400).json({ error: 'missing or invalid token' })

  req.tokenUserId = decodedToken.id
  next()

}

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.name, err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'invalid token'})
  }

  next(err)
}

module.exports = {
  // requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}