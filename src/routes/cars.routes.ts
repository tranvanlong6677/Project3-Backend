import { Router } from 'express'
import {
  createNewCarController,
  getAllCarController,
  getAllTypeCarController
} from '~/controllers/cars.controllers'
import { dataCreateCarValidator } from '~/middlewares/cars.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const carRouters = Router()

carRouters.post(
  '/create',
  dataCreateCarValidator,
  wrapRequestHandler(createNewCarController)
)
carRouters.get('/all', wrapRequestHandler(getAllCarController))
carRouters.get('/all-type', wrapRequestHandler(getAllTypeCarController))

export default carRouters
