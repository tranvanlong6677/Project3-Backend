import { CreateANewCarRequestBody } from '~/models/requests/Car.requests'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import carServices from '~/services/cars.services'
import { TokenPayload } from '~/models/requests/User.requests'
import { ErrorWithStatus } from '~/models/Errors'
import httpStatus from '~/constants/httpStatus'

export const createNewCarController = async (
  req: Request<ParamsDictionary, any, CreateANewCarRequestBody>,
  res: Response
) => {
  // await databaseService.cars.deleteMany({})
  const dataNewCar: CreateANewCarRequestBody = req.body
  const result = await carServices.createNewCar(dataNewCar)
  return res.json(result)
}

export const getAllCarController = async (req: Request, res: Response) => {
  const result = await carServices.getAllCars()
  return res.json(result)
}

export const getListCarPaginateController = async (req: Request, res: Response) => {
  const { page, perPage } = req.params

  const result = await carServices.getListCarPaginate(page, perPage)
  return res.json(result)
}

export const getListCarSearchController = async (req: Request, res: Response) => {
  const { page, perPage, provinceCode } = req.params
  const result = await carServices.getListCarSearch(page, perPage, provinceCode)
  return res.json(result)
}

export const getAllTypeCarController = async (req: Request, res: Response) => {
  const result = await carServices.getAllTypeCars()
  return res.json(result)
}

export const bookingController = async (req: Request, res: Response) => {
  const body = req.body
  const decoded = req.decoded_authorization as TokenPayload
  if (body.ownerId === decoded.user_id) {
    throw new ErrorWithStatus({
      status: httpStatus.BAD_REQUEST,
      message: 'Không thể thuê xe của chính mình'
    })
  }
  const dataBooking = { ...body, customerId: req.decoded_authorization?.user_id }
  const result = await carServices.bookingCar(dataBooking)
  return res.json(result)
}

export const getListBookedController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload

  const result = await carServices.getListBooked(user_id)
  return res.json({
    result
  })
}
export const getListBookedPaginateController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  // await databaseService.cars.deleteMany({})
  // await databaseService.bookings.deleteMany({})
  const { page, perPage } = req.params
  const result = await carServices.getListBookedPaginate({ user_id, page, perPage })
  return res.json(result)
}

export const getRentalListingsController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await carServices.getRentalListings(user_id)
  return res.json(result)
}
export const getRentalListingsPaginateController = async (
  req: Request,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { page, perPage } = req.params
  const result = await carServices.getRentalListingsPaginate({ user_id, page, perPage })
  return res.json(result)
}

export const conpleteOrderController = async (req: Request, res: Response) => {
  const { booking_id, car_id } = req.body
  const result = await carServices.completeOrder(booking_id, car_id)
  return res.json(result)
}
export const cancelOrderController = async (req: Request, res: Response) => {
  const { bookingId } = req.params as { bookingId: string }
  const result = await carServices.cancelOrder(bookingId)
  return res.json(result)
}

export const getListCarsUserController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { page, perPage } = req.params
  const result = await carServices.getListCarsUser(user_id, +page, +perPage)
  return res.json(result)
}
