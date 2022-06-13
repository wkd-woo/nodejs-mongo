const express = require('express')
const app = express()
const { userRouter, blogRouter } = require('./routes')
const mongoose = require('mongoose')
require('dotenv').config()

const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongodb connected')
    app.use(express.json())

    app.use('/user', userRouter)
    app.use('/blog', blogRouter)

    app.listen(3000, () => console.log('server listening on port 3000'))
  } catch (err) {
    console.log(err)
  }
}

server()
