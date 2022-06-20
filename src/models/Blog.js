const { Timestamp } = require('mongodb')
const { Schema, model, Types } = require('mongoose')

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false },
    user: { type: Types.ObjectId, required: true, ref: 'user' }, // 블로그와 유저의 관계-> ref로 걸어준다.
  },
  { timestamps: true }
)

BlogSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'blog',
})
BlogSchema.set('toObject', { virtuals: true })
BlogSchema.set('toJSON', { virtuals: true })

const Blog = model('blog', BlogSchema)

module.exports = { Blog }
