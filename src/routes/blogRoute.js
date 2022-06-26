const { Router } = require('express')
const blogRouter = Router()
const { Blog, User } = require('../models')
const { isValidObjectId } = require('mongoose')
const { commentRouter } = require('./commentRoute')

blogRouter.use('/:blogId/comment', commentRouter) // 자식관계이므로 블로그 하위의 미들웨어에 넣음

blogRouter.post('/', async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body
    if (typeof title !== 'string')
      return res.status(400).send({ err: 'title is required' })
    if (typeof content !== 'string')
      return res.status(400).send({ err: 'content is required' })
    if (islive && typeof islive !== 'boolean')
      return res.status(400).send({ err: 'islive must be a boolean' })
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: 'userId is invalid' })
    let user = await User.findById(userId)
    if (!user) res.status(400).send({ err: 'user does not exist' })

    let blog = new Blog({ ...req.body, user })
    await blog.save()
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.get('/', async (req, res) => {
  try {
    let blogs = await Blog.find({}).limit(20)
    // .populate([
    //   { path: 'user' },
    //   { path: 'comments', populate: { path: 'user' } },
    // ])

    return res.send({ blogs })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.get('/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      res.status(400).send({ err: 'blogId is invalid' })

    const blog = await Blog.findById(blogId)
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.put('/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      return res.status(400).send({ err: 'blogId is invalid' })
    const { title, content } = req.body
    if (typeof title !== 'string')
      return res.status(400).send({ err: 'title is required' })
    if (typeof content !== 'string')
      return res.status(400).send({ err: 'content is required' })

    let blog = await Blog.findById(blogId)
    /*
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { title: content },
      { new: true }
    )
    */
    if (title) blog.title = title
    if (content) blog.content = content
    await blog.save()
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.patch('/:blogId/live', async (req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      res.status(400).send({ err: 'blogId is invalid' })
    const { islive } = req.body
    if (typeof islive !== 'boolean')
      res.status(400).send({ err: 'boolean is required in islive' })

    let blog = await Blog.findById(blogId)
    /*
    const blog = await Blog.findOneAndUpdate(
      (blogId, {islive}, {new:true})
    )
    */
    if (islive) (blog.islive = islive), (blog.new = true)
    await blog.save()
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

module.exports = { blogRouter }
