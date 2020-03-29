import { Router } from 'express'

import getUser from './middleware/getUser'
import authRouter from './routes/auth'
import iamRouter from './routes/iam'
import memberRouter from './routes/member'
import teamRouter from './routes/team'
import customerRouter from './routes/customer'
import projectRouter from './routes/project'
import taskRouter from './routes/task'
import dashboardRouter from './routes/dashboard'
import userRouter from './routes/user/index'

export default () => {
    const app = Router()

    app.use(getUser)

    authRouter(app)
    iamRouter(app)
    memberRouter(app)
    teamRouter(app)
    customerRouter(app)
    projectRouter(app)
    taskRouter(app)
    dashboardRouter(app)
    userRouter(app)

    return app
}