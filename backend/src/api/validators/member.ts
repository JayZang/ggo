import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'
import datetimeValidator from './datetimeValidator'
import { MemberGender } from '@/entity/Member'

export function CreateMemberValidator(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('phone').exists({ checkFalsy: true }).isString(),
        body('gender').exists().isIn(Object.values(MemberGender)).toInt(),
        body('email').exists().isEmail(),
        body('birthday').exists().custom(datetimeValidator()),
        body('take_office_date').exists().custom(datetimeValidator()),
        body('leave_office_date').optional().exists().custom(datetimeValidator()),
        validate()
    ]
}

export function UpdateMemberValidator(): RequestHandler[] {
    return [
        body('name').optional().exists({ checkFalsy: true }).isString(),
        body('phone').optional().exists({ checkFalsy: true }).isString(),
        body('gender').optional().isIn(Object.values(MemberGender)).toInt(),
        body('email').optional().isEmail(),
        body('birthday').optional().exists().custom(datetimeValidator()),
        body('take_office_date').optional().exists().custom(datetimeValidator()),
        body('leave_office_date').optional().exists().custom(datetimeValidator()),
        validate()
    ]
}

export function CreateEmergenctContact(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('phone').exists({ checkFalsy: true }).isString(),
        body('relationship').exists({ checkFalsy: true }).isString(),
        validate()
    ]
}