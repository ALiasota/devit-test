import { Router } from 'express'
import { register, login } from '../../controllers/auth.controller'
import asyncWrapper from 'middlewares/asyncWrapper'

const authRouter: Router = Router()

authRouter.post('/register', asyncWrapper(register))
authRouter.post('/login', asyncWrapper(login))

export default authRouter
