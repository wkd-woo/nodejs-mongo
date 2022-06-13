const express = require('express')
const app = express()
const { userRouter } = require('./routes/userRoute')
const mongoose = require('mongoose')
require('dotenv').config()
const { User } = require('./models/User')

const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongodb connected')
    app.use(express.json())

    app.use('/user', userRouter)

    app.listen(3000, () => console.log('server listening on port 3000'))
  } catch (err) {
    console.log(err)
  }
}

server()
