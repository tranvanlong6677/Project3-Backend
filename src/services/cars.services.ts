import { CreateANewCarRequestBody } from '~/models/requests/Car.requests'
import Car from '~/models/schemas/Car.schema'
import { ObjectId } from 'mongodb'
import { userMessage } from '~/constants/messages'
import databaseService from './database.services'

class CarService {
  async createNewCar(payload: CreateANewCarRequestBody) {
    const result = await databaseService.cars.insertOne(
      new Car({ _id: new ObjectId(), ...payload, status: false })
    )
    return {
      message: userMessage.CREATE_A_CAR_SUCCESS,
      ...result
    }
  }
  async getAllCars() {
    const result = await databaseService.cars.find({}).toArray()
    console.log('result', result)
    return result
    // message: userMessage.GET_ALL_CAR_SUCCESS,
  }
}

const carServices = new CarService()
export default carServices
