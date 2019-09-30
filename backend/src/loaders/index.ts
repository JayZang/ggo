import { Application } from 'express'

import expressLoader from './express'
import mongoLoader from './mongo'

export default (app: Application) => {
  mongoLoader()
  expressLoader(app)
}