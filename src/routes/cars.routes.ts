import { Router } from 'express'
import {
  bookingController,
  conpleteOrderController,
  createNewCarController,
  getAllCarController,
  getAllTypeCarController,
  getListBookedController,
  getListBookedPaginateController,
  getRentalListingsController
} from '~/controllers/cars.controllers'
import { uploadImageController } from '~/controllers/medias.controllers'
import { dataCreateCarValidator } from '~/middlewares/cars.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const carRouters = Router()

carRouters.post(
  '/create',
  accessTokenValidator,
  dataCreateCarValidator,
  wrapRequestHandler(createNewCarController)
)
carRouters.get('/all', accessTokenValidator, wrapRequestHandler(getAllCarController))
carRouters.get('/all-type', wrapRequestHandler(getAllTypeCarController))
carRouters.post('/booking', accessTokenValidator, wrapRequestHandler(bookingController))
carRouters.get(
  '/list-booking',
  accessTokenValidator,
  wrapRequestHandler(getListBookedController)
)

carRouters.get(
  '/list-booking/page/:page/per-page/:perPage',
  accessTokenValidator,
  wrapRequestHandler(getListBookedPaginateController)
)

carRouters.get(
  '/rental-listings',
  accessTokenValidator,
  wrapRequestHandler(getRentalListingsController)
)

carRouters.put(
  '/complete-order',
  accessTokenValidator,
  wrapRequestHandler(conpleteOrderController)
)

// carRouters.post('/upload-image/:carId', wrapRequestHandler(uploadImageController))

export default carRouters
