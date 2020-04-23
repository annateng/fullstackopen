require('dotenv').config()

const MONGO_URL = (process.env.NODE_ENV === 'test') ? process.env.MONGO_URL_TEST : process.env.MONGO_URL
const PORT = process.env.PORT
const USE_LOGGER = process.env.NODE_ENV !== 'test'
const SECRET = process.env.SECRET

module.exports = { MONGO_URL, PORT, USE_LOGGER, SECRET }
