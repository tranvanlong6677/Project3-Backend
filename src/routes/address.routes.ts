import { Router } from 'express'
import {
  getAllProvinceController,
  getDistrictByProvinceController,
  getWardByDistrictController
} from '~/controllers/address.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const addressRouters = Router()

addressRouters.get('/province/all', wrapRequestHandler(getAllProvinceController))
addressRouters.get(
  `/district/by-province/:provinceCode`,
  wrapRequestHandler(getDistrictByProvinceController)
)
addressRouters.get(
  `/ward/by-district/:districtCode`,
  wrapRequestHandler(getWardByDistrictController)
)

export default addressRouters
