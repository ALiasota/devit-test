import jwt from 'jsonwebtoken'
import User from 'models/user'

export class AuthService {
  static async findById(id: string) {
    const user = await User.findById(id)
    return user
  }

  static async findByName(name: string) {
    const user = await User.findOne({ name })
    return user
  }

  static async createToken(name: string, id: string) {
    const token = jwt.sign({ name, id }, process.env.SECRET as string, { expiresIn: '24h' })
    return token
  }

  static async createUser(name: string, password: string) {
    const user = await User.create({ name, password })
    return user
  }
}
