import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'

export function CreateCustomer(): RequestHandler[] {
    return [
        body('logo').optional(),
        body('company_name').exists({ checkFalsy: true }).isString(),
        body('contact').exists({ checkFalsy: true }).isString(),
        body('phone').exists({ checkFalsy: true }).isString(),
        body('email').optional().isEmail(),
        body('website').optional().isURL(),
        body('address').optional().isString(),
        body('remark').optional().isString(),
        validate()
    ]
}

export function EditIndustryCategory(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        validate()
    ]
}