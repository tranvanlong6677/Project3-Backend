import { ObjectId } from 'mongodb'
interface TypeCarType {
  _id: ObjectId
  name: string
  code: number
}
export default class TypeCar {
  _id: ObjectId
  name: string
  code: number
  constructor(typeCar: TypeCarType) {
    this._id = typeCar._id || new ObjectId()
    this.name = typeCar.name
    this.code = typeCar.code
  }
}
