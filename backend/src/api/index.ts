import { Router } from 'express'

import authRouter from './routes/auth'
import memberRouter from './routes/member'
import teamRouter from './routes/team'
import customerRouter from './routes/customer'
import projectRouter from './routes/project'
import taskRouter from './routes/task'

export default () => {
    const app = Router()

    authRouter(app)
    memberRouter(app)
    teamRouter(app)
    customerRouter(app)
    projectRouter(app)
    taskRouter(app)

    return app
}