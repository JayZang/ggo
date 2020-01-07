import { RequestHandler } from 'express'
import { body } from 'express-validator'
import moment from 'moment'

import validate from './validate'
import datetimeValidator from './datetimeValidator'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import { TaskStatus } from '@/entity/Task'

export function CreateAndEditTask(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('description').optional().exists({ checkFalsy: true }).isString(),
        body('start_datetime').exists({ checkFalsy: true }).custom(datetimeValidator()),
        body('deadline_datetime').exists({ checkFalsy: true })
            .custom(datetimeValidator())
            .custom((value, { req }) => {
                return moment(value).isAfter(req.body.start_datetime)
            }),
        body('project_id').exists({ checkFalsy: true }),
        body('remark').optional().exists({ checkFalsy: true }).isString(),
        body('assign_type').exists().isIn(Object.values(TaskAssignmentType)),
        body('assign_id').exists({ checkFalsy: true }),
        validate()
    ]
}

export function UpdateTaskStatus(): RequestHandler[] {
    return [
        body('status').exists().isIn(Object.values(TaskStatus)).toInt(),
        validate()
    ]
}