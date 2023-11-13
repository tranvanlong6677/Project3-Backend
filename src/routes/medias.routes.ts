import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRouters = Router()

mediaRouters.post('/upload-image/:carId', wrapRequestHandler(uploadImageController))

export default mediaRouters
