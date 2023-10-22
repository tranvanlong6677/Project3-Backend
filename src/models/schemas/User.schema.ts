import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '../../utils/enums'
interface UserType {
  _id?: ObjectId
  name?: string
  email: string
  date_of_birth?: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  location?: string // optional
  username?: string // optional
  avatar?: string // optional
}
export default class User {
  _id: ObjectId
  name: string
  date_of_birth?: Date
  email: string
  password: string
  created_at: Date
  updated_at: Date
  location: string // optional
  username: string // optional
  avatar: string // optional
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name || ''
    this.email = user.email
    this.password = user.password
    this.location = user.location || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.date_of_birth = user.date_of_birth || new Date('01/01/1970')
  }
}
