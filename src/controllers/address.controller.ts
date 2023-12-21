import addressServices from '~/services/address.services'
import { NextFunction, Request, Response } from 'express'

export const getAllProvinceController = async (req: Request, res: Response) => {
  const result = await addressServices.getAllProvince()
  return res.json(result)
}

export const getDistrictByProvinceController = async (req: Request, res: Response) => {
  const provinceCode = req.params.provinceCode
  console.log('provinceCode: ', provinceCode)
  const result =
    provinceCode !== '-1'
      ? await addressServices.getDistrictByProvinceService(provinceCode)
      : []
  // console.log('result: ', result)
  return res.json(result)
}

export const getWardByDistrictController = async (req: Request, res: Response) => {
  const districtCode = req.params.districtCode
  const result =
    districtCode !== '-1'
      ? await addressServices.getWardByDistrictService(districtCode)
      : []
  return res.json(result)
}
