const { Router } = require('express')
const commentRouter = Router({ mergeParams: true })
const { Comment, Blog, User } = require('../models')
const { isValidObjectId } = require('mongoose')

/*
  /user
  /blog
  /blog/:blogId/comment
*/

commentRouter.post('/', async (req, res) => {
  try {
    const { blogId } = req.params
    const { content, userId } = req.body
    if (!isValidObjectId(blogId))
      return res.status(400).send({ err: 'blog is invalid' })
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: 'userId is invalid' })
    if (typeof content !== 'string')
      return res.status(400).send({ err: 'content is required' })

    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(userId),
    ])

    if (!blog || !user)
      return res.status(400).send({ err: 'blog or user does not exist' })
    if (!blog.islive)
      return res.status(400).send({ err: 'blog is not available' })

    const comment = new Comment({ content, user, blog })
    await Promise.all([
      comment.save(),
      Blog.updateOne({ _id: blogId }, { $push: { comments: comment } }),
    ])

    return res.send({ comment })
  } catch (err) {
    return res.status(400).sened({ err: err.message })
  }
})

commentRouter.get('/', async (req, res) => {
  const { blogId } = req.params
  if (!isValidObjectId(blogId))
    return res.status(400).send({ err: 'blog is invalid' })

  const comments = await Comment.find({ blog: blogId })
  return res.send({ comments })
})

module.exports = { commentRouter }
