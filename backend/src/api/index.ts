import { Router } from 'express'

import memberRouter from './routes/member'
import teamRouter from './routes/team'
import customerRouter from './routes/customer'
import projectRouter from './routes/project'
import taskRouter from './routes/task'

export default () => {
    const app = Router()

    memberRouter(app)
    teamRouter(app)
    customerRouter(app)
    projectRouter(app)
    taskRouter(app)

    return app
}