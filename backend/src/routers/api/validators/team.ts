import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'

export function CreateTeamValidator(): RequestHandler[] {
    return [
        body('name').exists({ checkFalsy: true }).isString(),
        body('description').exists({ checkFalsy: true }).isString(),
        body('leader').exists({ checkFalsy: true }),
        body('members').exists({ checkFalsy: true }).isArray(),
        validate() 
    ]
}