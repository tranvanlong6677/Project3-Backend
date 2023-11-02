import { ObjectId } from 'mongodb'
interface CarType {
  _id: ObjectId
  license_plate: string
  company: string
  price_per_day: number
  status: boolean
  deposit: number
  type_car: string
  image: string
}
export default class Car {
  _id: ObjectId
  license_plate: string
  company: string
  price_per_day: number
  status: boolean
  deposit: number
  type_car: string
  image: string
  constructor(car: CarType) {
    this._id = car._id || new ObjectId()
    this.license_plate = car.license_plate
    this.company = car.company
    this.price_per_day = car.price_per_day
    this.status = car.status
    this.deposit = car.deposit
    this.type_car = car.type_car
    this.image = car.image
  }
}
