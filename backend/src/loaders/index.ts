import { Application } from 'express'

import expressLoader from './express'
import mongoLoader from './mongo'
import mysqlLoader from './mysql'
import redisLoader from './redis'

export default (app: Application) => {
    mongoLoader()
    mysqlLoader()
    redisLoader()
    expressLoader(app)
}