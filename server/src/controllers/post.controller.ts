import { getPosts } from '../services/post.service'
// import { Request } from 'express'

export const getAllPosts = async () => {
  const posts = await getPosts()
  return posts
}

// export const addPost = async (req: Request) => {
//   const newDebt = req.body
//   const debt = await addDebt(newDebt)
//   return debt
// }

// export const updatePost = async (req: Request) => {
//   const { id } = req.params
//   const response = await notify(id)
//   return response
// }

// export const deletePost = async (req: Request) => {
//   const { id } = req.params
//   const request: { extraPayment: number } = req.body
//   const response = await notifyExtra(id, request.extraPayment)
//   return response
// }
