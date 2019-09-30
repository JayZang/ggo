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
    validate()
  ]
}