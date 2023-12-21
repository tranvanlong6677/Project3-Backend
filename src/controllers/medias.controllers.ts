import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { userMessage } from '~/constants/messages'
import mediasService from '~/services/medias.services'
export const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await mediasService.uploadImage(req)
  return res.status(200).json({
    message: userMessage.UPLOAD_SUCCESS,
    result: result
  })
}

export const serveImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_DIR, name), (err) => {
    if (err) {
      console.log(err)
      res.status((err as any).status).send('Not found')
    }
  })
}
