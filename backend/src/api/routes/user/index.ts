import { Router } from 'express'

import userTasksRouter from'./task'

const router = Router()

export default (app: Router) => {
    app.use('/m', router)

    userTasksRouter(router)
}