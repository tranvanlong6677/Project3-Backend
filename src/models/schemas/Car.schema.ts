import { ObjectId } from 'mongodb'
interface CarType {
  _id: ObjectId
  name: string
  license_plate: string
  company: string
  price_per_day: number
  status: boolean
  deposit: number
  type_car: number
  image: File
  quantity_of_trips: number
  address: {
    provinceCode: string
    districtCode: string
    wardCode: string
  }
  addressString: string
  owner_id: ObjectId
  owner_name: string
  phone_number: string
}
export default class Car {
  _id: ObjectId
  name: string
  license_plate: string
  company: string
  price_per_day: number
  status: boolean
  deposit: number
  type_car: number
  image: File
  quantity_of_trips: number
  address: {
    provinceCode: string
    districtCode: string
    wardCode: string
  }
  addressString: string
  owner_name: string
  owner_id: ObjectId
  phone_number: string

  constructor(car: CarType) {
    this._id = car._id || new ObjectId()
    this.name = car.name || ''
    this.license_plate = car.license_plate
    this.company = car.company
    this.price_per_day = car.price_per_day
    this.status = car.status
    this.deposit = car.deposit
    this.type_car = car.type_car
    this.image = car.image
    this.quantity_of_trips = car.quantity_of_trips
    this.address = car.address
    this.owner_id = car.owner_id
    this.addressString = car.addressString
    this.owner_name = car.owner_name
    this.phone_number = car.phone_number
  }
}
