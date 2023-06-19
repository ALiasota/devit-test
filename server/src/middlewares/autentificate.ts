// import { Request, Response, NextFunction } from 'express'
// import createError from 'http-errors'
// import jwt from 'jsonwebtoken'
// import { findById } from 'services/auth.service'
// import { IUser } from 'types/user'

// export interface IRequest extends Request {
//   user?: IUser
// }

// const authentificate = async (req: IRequest, _res: Response, next: NextFunction) => {
//   try {
//     const { authorization = '' } = req.headers
//     const [bearer, token] = authorization.split(' ')
//     if (bearer !== 'Bearer') {
//       const error = createError(401, 'Not authorized')
//       throw error
//     }

//     const payload = jwt.verify(token, process.env.SECRET as string)

//     const user = await findById(payload.id as string)
//     if (!user || user.token === null) {
//       const error = createError(401, 'Not authorized')
//       throw error
//     }
//     req.user = user
//     next()
//   } catch (err: any) {
//     if (!err.status) {
//       err.status = 401
//       err.message = 'Not authorized'
//     }
//     next(err)
//   }
// }

// export default authentificate
