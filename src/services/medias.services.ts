import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullName, handleUploadImage } from '~/utils/files'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/utils/enums'
import { Media } from '~/models/Other'
class MediaService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const fullName = getNameFromFullName(file.newFilename)
        await sharp(file.filepath)
          .jpeg()
          .toFile(UPLOAD_DIR + `/${fullName}.jpg`)
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${fullName}.jpg`
            : `http://localhost:8888/static/image/${fullName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
}

const mediasService = new MediaService()

export default mediasService
