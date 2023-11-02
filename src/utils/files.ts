import fs from 'fs'
import path from 'path'
export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads/images')
  if (!fs.existsSync(path.resolve(uploadFolderPath))) {
    console.log(111)
    fs.mkdirSync(uploadFolderPath, {
      recursive: true
    })
  }
}
