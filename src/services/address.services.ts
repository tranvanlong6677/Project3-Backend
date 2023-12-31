import databaseServices from './database.services'

class addressService {
  async getAllProvince() {
    const listProvince = await databaseServices.provinces.find({}).toArray()
    return listProvince
  }
  async getDistrictByProvinceService(provinceCode: string) {
    const listDistrictByProvince = await databaseServices.districts
      .find({
        parent_code: provinceCode
      })
      .toArray()
    return listDistrictByProvince
  }
  async getWardByDistrictService(districtCode: string) {
    const listWardByDistrict = await databaseServices.wards
      .find({
        parent_code: districtCode
      })
      .toArray()
    return listWardByDistrict
  }
}

const addressServices = new addressService()
export default addressServices
