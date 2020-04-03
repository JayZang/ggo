import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'

export function CreateWorkReportValidator(): RequestHandler[] {
    return [
        body('title').exists({ checkFalsy: true }).isString(),
        body('content').exists({ checkFalsy: true }).isString(),
        body('spend_time').exists({ checkFalsy: true }).isString(),
        validate()
    ]
}