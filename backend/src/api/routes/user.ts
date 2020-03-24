import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import UserService from '@/services/UserService'
import validateIsAuth from '@/api/middleware/validateIsAuth'

const router = Router()
const userService = Container.get(UserService)

export default (app: Router) => {
    app.use('/user', validateIsAuth, router)

    router.get('/tasks', async (req: Request, res: Response) => {
        const tasks = await userService.getTasks(req.user)

        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })
}