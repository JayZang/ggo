import { Application } from 'express'
import moment from 'moment-timezone';

import expressLoader from './express'
import mongoLoader from './mongo'
import mysqlLoader from './mysql'
import redisLoader from './redis'

export default (app: Application) => {
    moment.tz.setDefault("Asia/Taipei");

    mongoLoader()
    mysqlLoader()
    redisLoader()
    expressLoader(app)
}