const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose')

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: {
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: {
        type: String,
        required: true,
      },
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
    },
    blog: { type: ObjectId, required: true, ref: 'blog' },
  },
  { timestamps: true }
)

const Comment = model('comment', CommentSchema)
module.exports = { Comment, CommentSchema }
