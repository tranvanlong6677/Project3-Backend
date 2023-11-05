import fs from 'fs'
import path from 'path'
export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads/images')
  if (!fs.existsSync(path.resolve(uploadFolderPath))) {
    fs.mkdirSync(uploadFolderPath, {
      recursive: true
    })
  }
}
