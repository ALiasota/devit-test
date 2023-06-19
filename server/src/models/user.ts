import { Model, model, Schema } from 'mongoose'
import { IUser } from 'types/user'

const postSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    password: {
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

const User: Model<IUser> = model('User', postSchema)

export default User
