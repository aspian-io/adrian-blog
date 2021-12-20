const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const whitelist = ['http://example1.com', 'http://example2.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
// allow cors requests from whitelist origins and with credentials
app.use(cors(corsOptions))

module.exports = { app }
