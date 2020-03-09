import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import IAMService from '@/services/IAMService'
import { CreateOrUpdateGroup, DeleteGroups, CreateUser, UpdateUserPolicies, DeleteUsers } from '../validators/iam'

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

    router.delete('/groups', DeleteGroups(), async (req: Request, res: Response) => {
        const groups = await iamService.deleteGroup(req.body.ids)

        return groups ?
            res.json(groups) :
            res.status(400).end()
    })

    router.get('/users', async (req: Request, res: Response) => {
        const usersAndCount = await iamService.getUsers({
            take: req.query.count || 10,
            skip: req.query.offset || 0
        })

        return usersAndCount ?
            res.json({
                users: usersAndCount[0],
                count: usersAndCount[1]
            }) :
            res.status(400).end()
    })

    router.post('/users', CreateUser(), async (req: Request, res: Response) => {
        const userProfileXlsx = await iamService.createUser(req.body)

        if (!userProfileXlsx)
            return res.status(400).end()

        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.end(userProfileXlsx)
    })

    router.post('/users/:id/loginable', async (req: Request, res: Response) => {
        const user = await iamService.setUserLoginable(req.params.id, true)

        return user ?
            res.json(user) :
            res.status(400).end()
    })

    router.delete('/users/:id/loginable', async (req: Request, res: Response) => {
        const user = await iamService.setUserLoginable(req.params.id, false)

        return user ?
            res.json(user) :
            res.status(400).end()
    })

    router.post('/users/:id/policies', UpdateUserPolicies(), async (req: Request, res: Response) => {
        const user = await iamService.updateUserPolicies(req.params.id, {
            policyIds: req.body.policyIds,
            groupIds: req.body.groupIds
        })

        return user ?
            res.json(user) :
            res.status(400).end()
    })

    router.delete('/users', DeleteUsers(), async (req: Request, res: Response) => {
        const users = await iamService.deleteUsers(req.body.ids)

        return users ?
            res.json(users) :
            res.status(400).end()
    })
}