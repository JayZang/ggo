import { Router } from 'express'
import { Container } from 'typedi'

import validateIdentity from '@/api/middleware/validateIdentity'
import MemberTaskService from '@/services/UserArea/MemberTaskService'
import { UserIdentityType } from '@/entity/User'

const router = Router()
const memberTaskService = Container.get(MemberTaskService)

export default (app: Router) => {
    app.use('/tasks', validateIdentity(UserIdentityType.member), router)

    router.get('', async (req, res) => {
        const member = req.user!.identity
        const tasks = await memberTaskService.get(member, {
            take: req.query.count || 10,
            skip: req.query.offset || 0
        })

        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })

    router.get('/simple-statistic', async (req, res) => {
        const member = req.user!.identity
        const statistic = await memberTaskService.getTaskSimpleStatistic(member)

        return statistic ?
            res.json(statistic) :
            res.status(400).end()
    })

    router.get('/:id', async (req, res) => {
        const member = req.user!.identity
        const task = await memberTaskService.getOne(member, req.params.id)

        return task ?
            res.json(task) :
            res.status(400).end()
    })
}