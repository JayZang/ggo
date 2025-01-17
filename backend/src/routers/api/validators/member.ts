import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'
import datetimeValidator from './datetimeValidator'
import { MemberGender, MemberStatus } from '@/entity/Member'

export function CreateAndEditMember(): RequestHandler[] {
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

export function UpdateMemberStatus(): RequestHandler[] {
    return [
        body('status').exists().isIn(Object.values(MemberStatus)).toInt(),
        validate()
    ]
}

export function CreateEmergencyContact(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('phone').exists({ checkFalsy: true }).isString(),
        body('relationship').exists({ checkFalsy: true }).isString(),
        validate()
    ]
}
