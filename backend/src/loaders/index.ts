import { Application } from 'express'

import expressLoader from './express'
import mongoLoader from './mongo'
import mysqlLoader from './mysql'

export default (app: Application) => {
  mongoLoader()
  mysqlLoader()
  expressLoader(app)
}