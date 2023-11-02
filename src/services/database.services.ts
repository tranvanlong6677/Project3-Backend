import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Car from '~/models/schemas/Car.schema'
import Province from '~/models/schemas/Province.schema'
import District from '~/models/schemas/District.schema'
import Ward from '~/models/schemas/Ward.schema'

dotenv.config()
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ika8xjo.mongodb.net/?retryWrites=true&w=majority`
const uri =
  'mongodb+srv://tranvanlong6677:long6677@prj3cluster0.msr30il.mongodb.net/?retryWrites=true&w=majority'

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(process.env.DB_NAME)
  }
  run = async () => {
    try {
      await this.client.connect()
      await this.db.command({ ping: 1 })
      console.log('You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
    // finally {
    //   await this.client.close()
    // }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection('refresh_tokens')
  }
  // get emailVerifyTokens(): Collection<RefreshToken> {
  //   return this.db.collection('email_verify_tokens')
  // }
  get cars(): Collection<Car> {
    return this.db.collection('cars')
  }
  get provinces(): Collection<Province> {
    return this.db.collection('provinces')
  }
  get districts(): Collection<District> {
    return this.db.collection('districts')
  }
  get wards(): Collection<Ward> {
    return this.db.collection('wards')
  }
}
const databaseService = new DatabaseService()
export default databaseService
