import { Router } from 'express'

import userTasksRouter from'./task'
import userProjectRouter from './project'
import userProfileRouter from './profile'
import validateIsAuth from '@/routers/api/middleware/validateIsAuth'

const router = Router()

export default (app: Router) => {
    app.use('/m', validateIsAuth(), router)

    userTasksRouter(router)
    userProjectRouter(router)
    userProfileRouter(router)
}