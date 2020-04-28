import { Router, Response, Request } from 'express'
import { Container } from 'typedi'

import { UserIdentityType } from '@/entity/User'
import validateIdentity from '@/routers/api/middleware/validateIdentity'
import { CreateWorkReportValidator } from '@/routers/api/validators/workReport'
import MemberTaskService from '@/services/UserArea/MemberTask/MemberTaskService'
import TaskWorkReportService from '@/services/UserArea/MemberTask/TaskWorkReportService'
import { UserHelper } from '@/helper/UserHelper'

const router = Router()
const memberTaskService = Container.get(MemberTaskService)
const taskWorkReportService = Container.get(TaskWorkReportService)

export default (app: Router) => {
    app.use('/tasks', validateIdentity(
        UserHelper.identitiesForMember
    ), router)

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

    router.post('/:id/work-report', CreateWorkReportValidator(), async (req: Request, res: Response) => {
        const member = req.user!.identity
        const workReport = await taskWorkReportService.create(member, req.params.id, req.body)

        return workReport ?
            res.json(workReport) :
            res.status(400).end()
    })

    router.put('/:taskId/work-report/:workReportId', CreateWorkReportValidator(), async (req: Request, res: Response) => {
        const member = req.user!.identity
        const workReport = await taskWorkReportService.update(
            member, 
            req.params.taskId, 
            req.params.workReportId, 
            req.body
        )

        return workReport ?
            res.json(workReport) :
            res.status(400).end()
    })
}