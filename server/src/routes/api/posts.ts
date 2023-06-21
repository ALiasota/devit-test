import { Router } from 'express'
import { addPost, deletePost, getAllPosts, updatePost } from '../../controllers/post.controller'
import asyncWrapper from 'middlewares/asyncWrapper'
import authentificate from 'middlewares/autentificate'

const postRouter: Router = Router()

postRouter.use(authentificate)

postRouter.get('/', asyncWrapper(getAllPosts))

postRouter.post('/', asyncWrapper(addPost))

postRouter.put('/', asyncWrapper(updatePost))

postRouter.delete('/:postId', asyncWrapper(deletePost))

export default postRouter
