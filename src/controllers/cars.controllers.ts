import { CreateANewCarRequestBody } from '~/models/requests/Car.requests'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import carServices from '~/services/cars.services'

export const createNewCarController = async (
  req: Request<ParamsDictionary, any, CreateANewCarRequestBody>,
  res: Response
) => {
  const dataNewCar: CreateANewCarRequestBody = req.body
  const result = await carServices.createNewCar(dataNewCar)
  return res.json(result)
}

export const getAllCarController = async (req: Request, res: Response) => {
  const result = await carServices.getAllCars()
  return res.json(result)
}

export const getAllTypeCarController = async (req: Request, res: Response) => {
  const result = await carServices.getAllTypeCars()
  return res.json(result)
}
