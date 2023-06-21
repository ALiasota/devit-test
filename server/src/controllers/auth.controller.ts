import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { AuthService } from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const registeredUser = await AuthService.findByName(name)
  if (registeredUser) return res.status(401).end('User already registered')

  const hashPassword = await bcrypt.hash(password.trim(), 10)
  const user = await AuthService.createUser(name, hashPassword)
  const token = await AuthService.createToken(user.name, String(user._id))
  return { token }
}

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const registeredUser = await AuthService.findByName(name)
  if (!registeredUser) return res.status(401).end('User not found')
  const checkPassword = await bcrypt.compare(password, registeredUser.password)
  if (!checkPassword) return res.status(401).end('Wrong password')
  const token = await AuthService.createToken(registeredUser.name, String(registeredUser._id))
  return { token }
}
