import { BookingReqBody, CreateANewCarRequestBody } from '~/models/requests/Car.requests'
import Car from '~/models/schemas/Car.schema'
import { ObjectId } from 'mongodb'
import { userMessage } from '~/constants/messages'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import Booking from '~/models/schemas/Booking.schema'
import { differenceInDays, isAfter, isBefore, isSameDay } from 'date-fns'
import { ErrorWithStatus } from '~/models/Errors'
import httpStatus from '~/constants/httpStatus'
import Province from '~/models/schemas/Province.schema'

class CarService {
  async createNewCar(payload: CreateANewCarRequestBody) {
    const owner = (await databaseService.users.findOne({
      _id: new ObjectId(payload.owner_id)
    })) as User
    const address = (await databaseService.provinces.findOne({
      code: payload.address.provinceCode
    })) as Province
    const newId = new ObjectId()
    const result = await databaseService.cars.insertOne(
      new Car({
        _id: newId,
        ...payload,
        status: false,
        quantity_of_trips: 0,
        owner_id: new ObjectId(payload.owner_id),
        owner_name: owner.name,
        addressString: address.name_with_type || '',
        phone_number: owner.phone_number,
        image: `http://localhost:8888/static/image/${newId}.jpg`
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
  async getListCarPaginate(page: string, perPage: string) {
    const result = await databaseService.cars
      .aggregate([
        {
          $facet: {
            totalCount: [
              {
                $group: {
                  _id: null, // Nhóm theo _id
                  totalCount: { $sum: 1 } // Tính tổng số bản ghi
                }
              }
            ],
            result: [{ $skip: (+page - 1) * +perPage }, { $limit: +perPage }]
          }
        }
      ])
      .toArray()
    return result
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
      ? differenceInDays(endDate, startDate)
      : 1
    let checkTimeDuplicate = false
    const listBookingWithCar = await databaseService.bookings
      .find({
        carId: new ObjectId(dataBooking.carId)
      })
      .toArray()

    // eslint-disable-next-line prettier/prettier
    listBookingWithCar.forEach((item: any) => {
      // Trường hợp lịch đã đặt trước đó có ngày bắt đầu là sau ngày bắt đầu lịch đặt và ngày kết thúc của lịch đặt sau ngày bắt đầu của lịch đã đặt trước đó
      if (
        isAfter(new Date(item.start_date), new Date(dataBooking.start_date)) &&
        isAfter(new Date(dataBooking.end_date), new Date(item.start_date))
      ) {
        checkTimeDuplicate = true
        // break
      }
      if (
        isAfter(new Date(dataBooking.start_date), new Date(item.start_date)) &&
        isAfter(new Date(item.start_date), new Date(dataBooking.end_date))
      ) {
        checkTimeDuplicate = true
      }
      if (
        isSameDay(new Date(dataBooking.start_date), new Date(item.end_date)) ||
        isSameDay(new Date(dataBooking.end_date), new Date(item.start_date)) ||
        isSameDay(new Date(dataBooking.end_date), new Date(item.end_date)) ||
        isSameDay(new Date(dataBooking.start_date), new Date(item.start_date))
      ) {
        checkTimeDuplicate = true
      }
    })
    if (checkTimeDuplicate) {
      // return { message: 'Xe đã được đặt lịch trong thời gian mà bạn đã chọn' }
      throw new ErrorWithStatus({
        message: 'Xe đã được đặt lịch trong thời gian mà bạn đã chọn',
        status: httpStatus.BAD_REQUEST
      })
    }

    const price = carInfo.price_per_day * quantityOfDate + +carInfo?.deposit
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
    const bookingFind = (await databaseService.bookings.findOne({
      _id: new ObjectId(booking_id)
    })) as Booking
    const dateCurrent = new Date()
    if (
      isAfter(new Date(bookingFind.end_date), dateCurrent) ||
      isSameDay(new Date(bookingFind.end_date), dateCurrent)
    ) {
      throw new ErrorWithStatus({
        message: 'Đơn đặt xe chưa đến thời gian kết thúc',
        status: httpStatus.BAD_REQUEST
      })
    }

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
              {
                $unwind: '$car_info'
              },
              {
                $lookup: {
                  from: 'users',
                  localField: 'ownerId',
                  foreignField: '_id',
                  as: 'owner_info'
                }
              },
              {
                $unwind: '$owner_info'
              },
              {
                $project: {
                  ownder_info: {
                    password: 0,
                    created_at: 0,
                    updated_at: 0
                  }
                }
              },
              { $skip: (+page - 1) * +perPage },
              { $limit: +perPage }
            ]
          }
        }
      ])
      .toArray()
    return resultJoin
    // const result =
  }
  async getRentalListingsPaginate({
    user_id,
    page,
    perPage
  }: {
    user_id: string
    page: string
    perPage: string
  }) {
    const idObject = new ObjectId(user_id)
    const arrId = [idObject]
    const resultJoin = await databaseService.bookings
      .aggregate([
        {
          $facet: {
            totalCount: [
              {
                $match: {
                  ownerId: { $in: arrId }
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
                  ownerId: { $in: arrId }
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
              {
                $unwind: '$car_info'
              },
              {
                $lookup: {
                  from: 'users',
                  localField: 'customerId',
                  foreignField: '_id',
                  as: 'customer_info'
                }
              },

              {
                $unwind: '$customer_info'
              },
              {
                $project: {
                  customer_info: {
                    password: 0,
                    created_at: 0,
                    updated_at: 0
                  }
                }
              },
              { $skip: (+page - 1) * +perPage },
              { $limit: +perPage }
            ]
          }
        }
      ])
      .toArray()
    return resultJoin
  }
  async getListCarsUser(user_id: string, page: number, perPage: number) {
    const idObject = new ObjectId(user_id)
    const arrId = [idObject]
    const result = await databaseService.cars
      .aggregate([
        {
          $facet: {
            totalCount: [
              {
                $match: {
                  owner_id: { $in: arrId }
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
                  owner_id: new ObjectId(user_id)
                }
              },

              { $skip: (+page - 1) * +perPage },
              { $limit: +perPage }
            ]
          }
        }
      ])
      .toArray()
    return result
  }
  async getListCarSearch(page: string, perPage: string, provinceCode: string) {
    const arrProvinceCode = [provinceCode]

    const result = await databaseService.cars
      .aggregate([
        {
          $facet: {
            totalCount: [
              {
                $match: {
                  'address.provinceCode': { $in: arrProvinceCode }
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
                  'address.provinceCode': { $in: arrProvinceCode }
                }
              },
              { $skip: (+page - 1) * +perPage },
              { $limit: +perPage }
            ]
          }
        }
      ])
      .toArray()
    return result
  }
  async cancelOrder(id: string) {
    const result = await databaseService.bookings.deleteOne({ _id: new ObjectId(id) })
    return {
      message: 'Hủy lịch thành công',
      result
    }
  }
}

const carServices = new CarService()
export default carServices
