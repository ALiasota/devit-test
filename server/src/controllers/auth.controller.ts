import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { AuthService } from '../services/auth.service'
import { IRequest } from 'middlewares/autentificate'

export const register = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const registeredUser = await AuthService.findByName(name)
  if (registeredUser) return res.status(401).end('User already registered')

  const hashPassword = await bcrypt.hash(password.trim(), 10)
  const user = await AuthService.createUser(name, hashPassword)
  const token = await AuthService.createToken(user.name, String(user._id))
  return { token, user: { name: user.name, id: user._id } }
}

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const registeredUser = await AuthService.findByName(name)
  if (!registeredUser) return res.status(401).end('User not found')
  const checkPassword = await bcrypt.compare(password, registeredUser.password)
  if (!checkPassword) return res.status(401).end('Wrong password')
  const token = await AuthService.createToken(registeredUser.name, String(registeredUser._id))
  return { token, user: { name: registeredUser.name, id: registeredUser._id } }
}

export const logout = async (req: Request, res: Response) => {
  const { name } = req.body
  const registeredUser = await AuthService.findByName(name)
  if (!registeredUser) return res.status(401).end('User not found')

  return { token: '', user: { name: '', id: '' } }
}

export const getUser = async (req: IRequest, res: Response) => {
  const user = req.user
  if (!user) return res.status(401).end('User not found')

  return user
}
