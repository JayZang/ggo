import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import IAMService from '@/services/IAMService'
import { CreateOrUpdateGroup } from '../validators/iam'

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

    router.get('/groups', async (req: Request, res: Response) => {
        const groups = await iamService.getGroups()

        return groups ?
            res.json(groups) :
            res.status(400).end()
    })

    router.post('/groups', CreateOrUpdateGroup(), async (req: Request, res: Response) => {
        const group = await iamService.createGroup(req.body)

        return group ?
            res.json(group) :
            res.status(400).end()
    })

    router.put('/groups/:id', CreateOrUpdateGroup(), async (req: Request, res: Response) => {
        const group = await iamService.updateGroup(req.params.id, req.body)

        return group ?
            res.json(group) :
            res.status(400).end()
    })

    router.delete('/groups/:id', async (req: Request, res: Response) => {
        const group = await iamService.deleteGroup(req.params.id)

        return group ?
            res.json(group) :
            res.status(400).end()
    })
}