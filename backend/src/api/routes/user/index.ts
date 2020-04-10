import { Router } from 'express'

import userTasksRouter from'./task'
import validateIsAuth from '@/api/middleware/validateIsAuth'

const router = Router()

export default (app: Router) => {
    app.use('/m', validateIsAuth(), router)

    userTasksRouter(router)
}