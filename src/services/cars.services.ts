import { BookingReqBody, CreateANewCarRequestBody } from '~/models/requests/Car.requests'
import Car from '~/models/schemas/Car.schema'
import { ObjectId } from 'mongodb'
import { userMessage } from '~/constants/messages'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import District from '~/models/schemas/District.schema'
import Booking from '~/models/schemas/Booking.schema'
import { differenceInDays } from 'date-fns'

class CarService {
  async createNewCar(payload: CreateANewCarRequestBody) {
    const owner = (await databaseService.users.findOne({
      _id: new ObjectId(payload.owner_id)
    })) as User
    const address = (await databaseService.districts.findOne({
      code: owner.address.districtCode
    })) as District
    const result = await databaseService.cars.insertOne(
      new Car({
        _id: new ObjectId(),
        ...payload,
        status: false,
        quantity_of_trips: 0,
        owner_id: new ObjectId(payload.owner_id),
        owner_name: owner.name,
        addressString: address.path_with_type || '',
        phone_number: owner.phone_number
      })
    )
    return {
      message: userMessage.CREATE_A_CAR_SUCCESS,
      result
    }
  }
  async getAllCars() {
    const result = await databaseService.cars.find({}).toArray()
    return result
    // message: userMessage.GET_ALL_CAR_SUCCESS,
  }
  async getAllTypeCars() {
    const result = await databaseService.typeCars.find({}).toArray()
    return result
  }
  async bookingCar(dataBooking: BookingReqBody) {
    const carInfo = (await databaseService.cars.findOne({
      _id: new ObjectId(dataBooking.carId)
    })) as Car
    const startDate = new Date(dataBooking.start_date)
    const endDate = new Date(dataBooking.end_date)
    const quantityOfDate = differenceInDays(endDate, startDate)

    const price = carInfo.price_per_day * quantityOfDate
    const result = await databaseService.bookings.insertOne(
      new Booking({
        _id: new ObjectId(),
        ...dataBooking,
        price,
        ownerId: new ObjectId(dataBooking.ownerId),
        customerId: new ObjectId(dataBooking.customerId),
        carId: new ObjectId(dataBooking.carId),
        isDone: false
      })
    )
    return { result, message: userMessage.BOOKING_SUCCESS }
  }
  async getListBooked(user_id: string) {
    const resultJoin = await databaseService.bookings
      .aggregate([
        {
          $lookup: {
            from: 'cars',
            localField: 'carId',
            foreignField: '_id',
            as: 'car_info'
          }
        }
      ])
      .toArray()
    const result = resultJoin.filter((item) => item.customerId.toString() === user_id)
    console.log(result)

    return {
      ...result,
      message: 'get list booked successfully'
    }
  }
  async getRentalListings(user_id: string) {
    const resultJoin = await databaseService.bookings
      .aggregate([
        {
          $lookup: {
            from: 'cars',
            localField: 'carId',
            foreignField: '_id',
            as: 'car_info'
          }
        }
      ])
      .toArray()
    const result = resultJoin.filter((item) => item.ownerId.toString() === user_id)

    return {
      ...result,
      message: 'get rental listings successfully'
    }
  }
  async completeOrder(booking_id: string, car_id: string) {
    await databaseService.bookings.updateOne({ _id: new ObjectId(booking_id) }, [
      {
        $set: {
          isDone: true
        }
        // $currentDate: {
        //   updated_at: true
        // }
      }
    ])
    await databaseService.cars.updateOne(
      { _id: new ObjectId(car_id) },
      { $inc: { quantity_of_trips: 1 } }
    )
    return {
      message: userMessage.COMPLETE_ORDER_SUCCESS
    }
  }

  async getListBookedPaginate({
    user_id,
    page,
    perPage
  }: {
    user_id: string
    page: string
    perPage: string
  }) {
    console.log('user_id', user_id)
    console.log('page', page)
    console.log('perPage', perPage)
    const idObject = new ObjectId(user_id)
    const arrId = [idObject]
    const resultJoin = await databaseService.bookings
      .aggregate([
        {
          $facet: {
            totalCount: [
              {
                $match: {
                  customerId: { $in: arrId }
                }
              },
              {
                $group: {
                  _id: null, // Nhóm theo _id
                  totalCount: { $sum: 1 } // Tính tổng số bản ghi
                }
              }
            ],
            result: [
              {
                $match: {
                  customerId: { $in: arrId }
                }
              },
              {
                $lookup: {
                  from: 'cars',
                  localField: 'carId',
                  foreignField: '_id',
                  as: 'car_info'
                }
              },
              { $skip: (+page - 1) * +perPage },
              { $limit: +perPage }
            ]
          }
        }
      ])
      .toArray()
    console.log('result', resultJoin)
    return resultJoin
    // const result =
  }
}

const carServices = new CarService()
export default carServices
