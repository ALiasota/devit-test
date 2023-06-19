import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  _id?: mongoose.Schema.Types.ObjectId
}
