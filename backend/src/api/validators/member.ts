import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'
import datetimeValidator from './datetimeValidator'

export function CreateMemberValidator(): RequestHandler[] {
  return  [
    body('name').exists({ checkFalsy: true }).isString(),
    body('phone').exists({ checkFalsy: true }).isString(),
    body('gender').exists().isBoolean(),
    body('email').exists().isEmail(),
    body('birthday').exists().custom(datetimeValidator()),
    body('take_office_date').exists().custom(datetimeValidator()),
    body('leave_office_date').optional().exists().custom(datetimeValidator()),
    body('emergency_contact_name').exists({ checkFalsy: true }).isString(),
    body('emergency_contact_relationship').exists({ checkFalsy: true }).isString(),
    body('emergency_contact_phone').exists({ checkFalsy: true }).isString(),
    body('password').exists({ checkFalsy: true }).isString(),
    body('password_confirm').exists({ checkFalsy: true }).isString().custom((val, { req }) => val === req.body.password),
    validate()
  ]
}

export function UpdateMemberValidator(): RequestHandler[] {
  return [
    body('name').optional().exists({ checkFalsy: true }).isString(),
    body('phone').optional().exists({ checkFalsy: true }).isString(),
    body('gender').optional().isBoolean(),
    body('email').optional().isEmail(),
    body('birthday').optional().exists().custom(datetimeValidator()),
    body('take_office_date').optional().exists().custom(datetimeValidator()),
    body('leave_office_date').optional().exists().custom(datetimeValidator()),
    body('emergency_contact_name').optional().exists({ checkFalsy: true }).isString(),
    body('emergency_contact_relationship').optional().exists({ checkFalsy: true }).isString(),
    body('emergency_contact_phone').optional().exists({ checkFalsy: true }).isString(),
    validate()
  ]
}