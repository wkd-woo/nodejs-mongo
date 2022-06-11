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

    app.get('/user', async (req, res) => {
      try {
        const users = await User.find({})
        return res.send({ users })
      } catch (err) {
        console.log(err)
        return res.status(500).send({ err: err.message })
      }
    })

    app.get('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: 'invalid userId' })

        const user = await User.findOne({ _id: userId })
        return res.send({ user })
      } catch (err) {
        console.log(err)
        return res.status(500).send({ err: err.message })
      }
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

    app.delete('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: 'invalid userId' })
        const user = await User.findOneAndDelete({ _id: userId })
        return res.send({ user })
      } catch (err) {
        console.log(err)
        return res.status(500).send({ err: err.message })
      }
    })

    app.put('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: 'invalid userId' })

        const { age } = req.body
        if (!age) return res.status(400).send({ err: 'age is required' })
        if (typeof age !== 'number')
          return res.status(400).send({ err: 'age must be a number' })

        const user = await User.findByIdAndUpdate(
          userId,
          { $set: { age } },
          { new: true }
        )
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
