require('dotenv').config()

const MONGO_URL = (process.env.NODE_ENV === 'test') ? process.env.MONGO_URL_TEST : process.env.MONGO_URL
const PORT = process.env.PORT

module.exports = { MONGO_URL, PORT }
