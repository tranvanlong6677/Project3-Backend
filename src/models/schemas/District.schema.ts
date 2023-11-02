import { ObjectId } from 'mongodb'
interface DistrictType {
  _id: ObjectId
  name: string
  slug: string
  type: string
  name_with_type: string
  code: string
  isDeleted: boolean
  path: string
  path_with_type: string
  parent_code: string
}
export default class District {
  _id: ObjectId
  name: string
  slug: string
  type: string
  name_with_type: string
  code: string
  isDeleted: boolean
  path: string
  path_with_type: string
  parent_code: string
  constructor(district: DistrictType) {
    this._id = district._id || new ObjectId()
    this.name = district.name
    this.slug = district.slug
    this.type = district.type
    this.name_with_type = district.name_with_type
    this.code = district.code
    this.isDeleted = district.isDeleted
    this.path = district.path
    this.path_with_type = district.path_with_type
    this.parent_code = district.parent_code
  }
}
