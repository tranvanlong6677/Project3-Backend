import { ObjectId } from 'mongodb'

export interface CreateANewCarRequestBody {
  name: string
  license_plate: string
  company: string
  price_per_day: number
  deposit: number
  type_car: number
  image: File
  address: {
    provinceCode: string
    districtCode: string
    wardCode: string
  }
  owner_id: ObjectId
}

export interface BookingReqBody {
  ownerId: string
  carId: string
  start_date: string
  end_date: string
  customerId: string
}
