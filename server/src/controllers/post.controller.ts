import { IRequest } from 'middlewares/autentificate'
import { PostService } from '../services/post.service'
import { Request, Response } from 'express'

export const getAllPosts = async (req: Request) => {
  const { search, skip, limit, sort } = req.query
  const posts = await PostService.getPosts({
    search: search ? String(search) : undefined,
    skip: skip ? Number(skip) : undefined,
    limit: limit ? Number(limit) : undefined,
    sort: sort ? String(sort) : undefined
  })
  return posts
}

export const addPost = async (req: IRequest, res: Response) => {
  const user = req.user
  if (!user) return res.status(401).end('User not found')
  const { title, content } = req.body
  const post = await PostService.createPost(user.id, title, content)
  return post
}

export const updatePost = async (req: IRequest, res: Response) => {
  const { title, content, postId } = req.body
  const post = await PostService.updatePost(postId, title, content)
  if (!post) return res.status(400).end('Something went wrong')
  return post
}

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const post = await PostService.deletePost(postId)
  if (!post) return res.status(400).end('Something went wrong')
  return post
}
