import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import UserService from '@/services/UserService'
import validateIsAuth from '@/api/middleware/validateIsAuth'

const router = Router()
const userService = Container.get(UserService)

export default (app: Router) => {
    app.use('/user', validateIsAuth, router)

    router.get('/tasks', async (req: Request, res: Response) => {
        const tasksAndCount = await userService.getTasks(req.user, {
            skip: req.query.offset || 0,
            take: req.query.count || 10
        })

        return tasksAndCount ?
            res.json({
                tasks: tasksAndCount[0],
                count: tasksAndCount[1]
            }) :
            res.status(400).end()
    })
}