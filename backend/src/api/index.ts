import { Router } from 'express'

import memberRouter from './routes/member'
import teamRouter from './routes/team'
import customerRouter from './routes/customer'
import projectRouter from './routes/project'

export default () => {
    const app = Router()

    memberRouter(app)
    teamRouter(app)
    customerRouter(app)
    projectRouter(app)

    return app
}