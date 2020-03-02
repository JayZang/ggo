import { RequestHandler } from 'express'
import { body } from 'express-validator'

import validate from './validate'
import { UserIdentityType } from '@/entity/User'

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

export function CreateUser(): RequestHandler[] {
    return [
        body('identity_type').exists({ checkFalsy: true }).isIn(Object.values(UserIdentityType)),
        body('identity_id').exists({ checkFalsy: true }),
        body('policy_ids').optional().isArray(),
        body('group_ids').optional().isArray(),
        validate()
    ]
}
