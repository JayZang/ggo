import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

export const system = {
  port: process.env.PORT || 300
}

export const database = {
  mongo: {
    url: env === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI
  }
}