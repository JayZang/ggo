import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import { isNull } from 'util'

import TaskService from '@/services/TaskService'
import validatePermission from '@/api/middleware/validatePermission'
import { CreateAndEditTask, UpdateTaskStatus } from '@/api/validators/task'
import validateIdentity from '@/api/middleware/validateIdentity'
import { UserIdentityType } from '@/entity/User'

const router = Router()
const taskService = Container.get(TaskService)

export default (app: Router) => {
    app.use('/tasks', router)

    router.get('', validatePermission('project_management'), async (req, res) => {
        const tasks = await taskService.get({
            skip: req.query.offset || 0,
            take: req.query.count || 10
        })
        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })

    router.get('/count-statistic', validatePermission('project_management'), async (req, res) => {
        const totalCount = await taskService.getTotalCount()
        
        return !isNull(totalCount) ?
            res.json({
                totalCount
            }) :
            res.status(400).end()
    })

    router.post('', validateIdentity([
        UserIdentityType.manager,
        UserIdentityType.member
    ]), CreateAndEditTask(), async (req: Request, res: Response) => {
        const member = req.user!.identity!
        const task = await taskService.create(req.body, member)

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })

    router.post('/:id/status', validateIdentity([
        UserIdentityType.manager,
        UserIdentityType.member
    ]), UpdateTaskStatus(), async (req: Request, res: Response) => {
        const member = req.user!.identity!
        const task = await taskService.updateStatus(req.params.id, req.body.status, member)

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })

    router.get('/:id', validatePermission('project_management'), async (req: Request, res: Response) => {
        const task = await taskService.getOneByTaskId(req.params.id)

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })
}