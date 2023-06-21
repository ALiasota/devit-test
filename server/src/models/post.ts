import mongoose, { Model, model, Schema } from 'mongoose'
import { IPost } from 'types/post'

const postSchema = new Schema<IPost>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: false
    },
    updatedAt: {
      type: Date,
      required: false
    }
  },
  { versionKey: false, timestamps: true }
)

const Post: Model<IPost> = model('Post', postSchema)

export default Post
