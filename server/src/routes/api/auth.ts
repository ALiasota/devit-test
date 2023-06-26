import { Router } from 'express'
import { register, login, logout, getUser } from '../../controllers/auth.controller'
import asyncWrapper from 'middlewares/asyncWrapper'
import authentificate from 'middlewares/autentificate'

const authRouter: Router = Router()

authRouter.post('/register', asyncWrapper(register))

authRouter.post('/login', asyncWrapper(login))

authRouter.post('/logout', asyncWrapper(logout))

authRouter.post('/logout', authentificate, asyncWrapper(getUser))

export default authRouter
