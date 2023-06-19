import mongoose, { Document } from 'mongoose'

export interface IPost extends Document {
  creator: mongoose.Schema.Types.ObjectId
  title: string
  content: string
  createdAt?: Date
  updatedAt?: Date
  _id?: mongoose.Schema.Types.ObjectId
}
