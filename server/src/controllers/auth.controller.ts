import { Request } from 'express'
import createError from 'http-errors'
import bcrypt from 'bcryptjs'
import { findByName, createUser, createToken } from '../services/auth.service'

export const register = async (req: Request) => {
  const { name, password } = req.body
  const registeredUser = await findByName(name)
  if (registeredUser) {
    const error = createError(409, 'User already registered')
    throw error
  }
  const hashPassword = await bcrypt.hash(password.trim(), 10)
  const user = await createUser(name, hashPassword)
  const token = createToken(user.name, String(user._id))
  return token
}

export const login = async (req: Request) => {
  const { name, password } = req.body
  const registeredUser = await findByName(name)
  if (!registeredUser) {
    const error = createError(401, 'User not found')
    throw error
  }
  const checkPassword = await bcrypt.compare(password, registeredUser.password)
  if (!checkPassword) {
    const error = createError(401, 'Wrong password')
    throw error
  }
  const token = createToken(registeredUser.name, String(registeredUser._id))
  return token
}
