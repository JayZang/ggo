import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import IAMService from '@/services/IAMService'

const router = Router()
const iamService = Container.get(IAMService)

export default (app: Router) => {
    app.use('/iam', router)

    router.get('/policies', async (req: Request, res: Response) => {
        const policies = await iamService.getPolicies()

        return policies ?
            res.json(policies) :
            res.status(400).end()
    })

}