import { ObjectId } from 'mongodb'
interface ProvinceType {
  _id: ObjectId
  name: string
  slug: string
  type: string
  name_with_type: string
  code: string
  isDeleted: boolean
}
export default class Province {
  _id: ObjectId
  name: string
  slug: string
  type: string
  name_with_type: string
  code: string
  isDeleted: boolean
  constructor(province: ProvinceType) {
    this._id = province._id || new ObjectId()
    this.name = province.name
    this.slug = province.slug
    this.type = province.type
    this.name_with_type = province.name_with_type
    this.code = province.code
    this.isDeleted = province.isDeleted
  }
}
