import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import { isNull } from 'util'
import _ from 'lodash'

import TaskService from '@/services/TaskService'
import validatePermission from '@/routers/api/middleware/validatePermission'

const router = Router()
const taskService = Container.get(TaskService)

export default (app: Router) => {
    app.use('/tasks', validatePermission('project_management'), router)

    router.get('/', async (req, res) => {
        const tasks = await taskService.get({
            skip: req.query.offset || 0,
            take: req.query.count || 10
        }, _.omit(req.query, 'offset', 'count'))
        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })

    router.get('/count-statistic', async (req, res) => {
        const totalCount = await taskService.getTotalCount(req.query)
        
        return !isNull(totalCount) ?
            res.json({
                totalCount
            }) :
            res.status(400).end()
    })

    router.get('/:id', async (req: Request, res: Response) => {
        const task = await taskService.getOneByTaskId(req.params.id)

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })
}