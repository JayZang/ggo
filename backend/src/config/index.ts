import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

export const system = {
  port: process.env.PORT || 300
}

export const database = {
  mysql: {
    host: process.env.MYSQL_HOST || 'mysql',
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: env === 'test' ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE
  },
  mongo: {
    url: env === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI
  }
}