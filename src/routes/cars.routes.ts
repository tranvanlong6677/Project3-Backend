import { Router } from 'express'
import {
  createNewCarController,
  getAllCarController
} from '~/controllers/cars.controllers'
import { dataCreateCarValidator } from '~/middlewares/cars.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const carRouters = Router()

carRouters.post(
  '/create-new-car',
  dataCreateCarValidator,
  wrapRequestHandler(createNewCarController)
)
carRouters.get('/get-all-cars', wrapRequestHandler(getAllCarController))

export default carRouters
