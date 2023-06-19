import jwt from 'jsonwebtoken'
import User from 'models/user'

export const findById = async (id: string) => {
  const user = await User.findById(id)
  return user
}

export const findByName = async (name: string) => {
  const user = await User.findOne({ name })
  return user
}

export const createToken = (name: string, id: string) => {
  const token = jwt.sign({ name, id }, process.env.SECRET as string, { expiresIn: '24h' })
  return token
}

export const createUser = async (name: string, password: string) => {
  const user = await User.create({ name, password })
  return user
}
