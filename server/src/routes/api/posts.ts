import { Router } from 'express'
import { getAllPosts } from '../../controllers/post.controller'
import asyncWrapper from 'middlewares/asyncWrapper'

const postRouter: Router = Router()

postRouter.get('', asyncWrapper(getAllPosts))

export default postRouter
