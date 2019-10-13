import mongoose from "mongoose"

import { database } from '@/config'

export default async () => {
  mongoose.Promise = Promise
  await mongoose.connect(database.mongo.url, {useNewUrlParser: true})
    .then(() => {
      console.log('MongoDB Connect Success')
    })
    .catch(() => {
      console.log('MongoDB Connect Failed')
      process.exit()
    })
}