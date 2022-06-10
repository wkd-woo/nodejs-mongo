const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const { User } = require('./models/User')

const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongodb connected')

    app.use(express.json())

    app.get('/user', (req, res) => {
      // return res.send({ users: users })
    })

    app.post('/user', async (req, res) => {
      try {
        let { username, name } = req.body
        if (!username)
          return res.status(400).send({ err: 'username is required' })
        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: 'Both first and last names are required' })
        const user = new User(req.body)
        await user.save()
        return res.send({ user })
      } catch (err) {
        console.log(err)
        return res.status(500).send({ err: err.message })
      }
    })

    app.listen(3000, () => console.log('server listening on port 3000'))
  } catch (err) {
    console.log(err)
  }
}

server()
