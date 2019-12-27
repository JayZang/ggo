import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import TaskService from '@/services/TaskService'

const router = Router()
const taskService = Container.get(TaskService)

export default (app: Router) => {
    app.use('/tasks', router)
}