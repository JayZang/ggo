import { Router } from 'express'

import iamRouter from './iam'
import memberRouter from './member'
import teamRouter from './team'
import customerRouter from './customer'
import projectRouter from './project'
import taskRouter from './task'
import workReportRouter from './workReport'
import validateIsAuth from '@/api/middleware/validateIsAuth'

const router = Router()

export default (app: Router) => {
    app.use(validateIsAuth(), router)

    iamRouter(router)
    memberRouter(router)
    teamRouter(router)
    customerRouter(router)
    projectRouter(router)
    taskRouter(router)
    workReportRouter(router)
}