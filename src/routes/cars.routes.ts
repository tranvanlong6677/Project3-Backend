import { Router } from 'express'
import {
  createNewCarController,
  getAllCarController,
  getAllTypeCarController
} from '~/controllers/cars.controllers'
import { uploadImageController } from '~/controllers/medias.controllers'
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
// carRouters.post('/upload-image/:carId', wrapRequestHandler(uploadImageController))

export default carRouters
