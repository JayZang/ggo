import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import TaskService from '@/services/TaskService'
import { CreateAndEditTask, UpdateTaskStatus } from '../validators/task'

const router = Router()
const taskService = Container.get(TaskService)

export default (app: Router) => {
    app.use('/tasks', router)

    router.post('', CreateAndEditTask(), async (req: Request, res: Response) => {
        const task = await taskService.create(req.body)

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })

    router.post('/:id/status', UpdateTaskStatus(), async (req: Request, res: Response) => {
        const task = await taskService.updateStatus(req.params.id, req.body.status)

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })
}