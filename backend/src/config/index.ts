import dotenv from 'dotenv'

dotenv.config()

export const system = {
  port: process.env.PORT || 300
}