import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'

export function CreateOrUpdateGroup(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('description').optional().exists({ checkFalsy: true }).isString(),
        body('policy_ids').exists({ checkFalsy: true }).isArray(),
        validate()
    ]
}

export function DeleteGroups(): RequestHandler[] {
    return [
        body('ids').exists({ checkFalsy: true }).isArray(),
        validate()
    ]
}
