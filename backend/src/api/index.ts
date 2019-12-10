import { Router } from 'express'

import memberRouter from './routes/member'
import teamRouter from './routes/team'
import customerRouter from './routes/customer'

export default () => {
    const app = Router()

    memberRouter(app)
    teamRouter(app)
    customerRouter(app)

    return app
}