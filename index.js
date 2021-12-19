const mongoose = require('mongoose')
const { app } = require('./app')
require('dotenv').config()

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }

  const PORT = process.env.PORT
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()
