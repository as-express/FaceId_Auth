import mongoose from 'mongoose'
import { env } from './env.config'

export const dbConnection = async () => {
  await mongoose.connect(String(env.MONGO)).then(() => {
    console.log('Mongo connection success')
  })
}
