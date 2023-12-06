import { ObjectId } from 'mongodb'
interface BookingType {
  _id: ObjectId
  ownerId: ObjectId
  customerId: ObjectId
  carId: ObjectId
  start_date: string
  end_date: string
  price: number
  isDone: boolean
}
export default class Booking {
  _id: ObjectId
  ownerId: ObjectId
  customerId: ObjectId
  carId: ObjectId
  start_date: string
  end_date: string
  price: number
  isDone: boolean

  constructor(booking: BookingType) {
    this._id = booking._id
    this.ownerId = booking.ownerId
    this.customerId = booking.customerId
    this.carId = booking.carId
    this.start_date = booking.start_date
    this.end_date = booking.end_date
    this.price = booking.price
    this.isDone = booking.isDone
  }
}
