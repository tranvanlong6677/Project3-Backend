import express from 'express'
import userRouters from './routes/users.routes'
import databaseService from './services/database.services'
import dotenv from 'dotenv'
import { defaultErrorHandler } from './middlewares/error.middleware'
const app = express()
const port = process.env.PORT || 8888
import cors from 'cors'
import { initFolderImages } from './utils/files'
import carRouters from './routes/cars.routes'
import addressRouters from './routes/address.routes'
import bodyParser from 'body-parser'
import staticRouters from './routes/static.routes'
import mediaRouters from './routes/medias.routes'
initFolderImages()

dotenv.config()
app.use(cors())
// connect database
databaseService.run()

// Middlewares
// parse req.body
app.use(express.json())
app.use(bodyParser.json())
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))
//form-urlencoded

// for parsing multipart/form-data
app.use('/users', userRouters)
app.use('/cars', carRouters)
app.use('/address', addressRouters)
app.use('/static', staticRouters)
app.use('/medias', mediaRouters)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
