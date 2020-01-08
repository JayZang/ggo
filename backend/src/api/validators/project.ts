import { RequestHandler } from 'express'
import { body } from 'express-validator'
import moment from 'moment'

import validate from './validate'
import datetimeValidator from './datetimeValidator'
import { ProjectSrcType } from '@/entity/Project'

export function CreateAndEditProject(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('description').optional().exists({ checkFalsy: true }).isString(),
        body('start_datetime').exists({ checkFalsy: true }).custom(datetimeValidator()),
        body('deadline_datetime').exists({ checkFalsy: true })
            .custom(datetimeValidator())
            .custom((value, { req }) => {
                return moment(value).isAfter(req.body.start_datetime)
            }),
        body('quote').optional().isNumeric(),
        body('source_type').exists().isIn(Object.values(ProjectSrcType)).toInt(),
        body('customer_id').if((value: any, meta: any) => meta.req.body.source_type === ProjectSrcType.Customer).exists({ checkFalsy: true }),
        body('remark').optional().exists({ checkFalsy: true }).isString(),
        validate()
    ]
}

export function FinishProject(): RequestHandler[] {
    return [
        body('date').exists({ checkFalsy: true }).custom(datetimeValidator()),
        validate()
    ]
}