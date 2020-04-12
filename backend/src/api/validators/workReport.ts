import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'
import datetimeValidator from './datetimeValidator'
import moment = require('moment')

export function CreateWorkReportValidator(): RequestHandler[] {
    return [
        body('title').exists({ checkFalsy: true }).isString(),
        body('content').exists({ checkFalsy: true }).isString(),
        body('start_time').exists({ checkFalsy: true }).custom(datetimeValidator()),
        body('end_time').exists({ checkFalsy: true })
            .custom(datetimeValidator())
            .custom((value, { req }) => {
                return moment(value).isAfter(req.body.start_time)
            }),
        validate()
    ]
}