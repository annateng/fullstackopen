/** ONLY LOG IN PRODUCTION MODE */
const config = require('./config')

const info = (...params) => {
  if (config.USE_LOGGER) console.log(...params)
}

const error = (...params) => {
  if (config.USE_LOGGER) console.error(...params)
}

module.exports = { info, error }