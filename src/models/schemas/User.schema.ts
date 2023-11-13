import { ObjectId } from 'mongodb'
interface UserType {
  _id?: ObjectId
  name?: string
  email: string
  date_of_birth?: Date
  password: string
  phone_number: string
  created_at?: Date
  updated_at?: Date
  address: {
    provinceCode: string
    districtCode: string
    wardCode: string
  }
}
export default class User {
  _id: ObjectId
  name: string
  date_of_birth?: Date
  email: string
  password: string
  phone_number: string
  created_at: Date
  updated_at: Date
  address: {
    provinceCode: string
    districtCode: string
    wardCode: string
  }
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name || ''
    this.email = user.email
    this.password = user.password
    this.phone_number = user.phone_number
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.date_of_birth = user.date_of_birth || new Date('01/01/1970')
    this.address = user.address || {
      provinceCode: '-1',
      districtCode: '-1',
      wardCode: '-1'
    }
  }
}
