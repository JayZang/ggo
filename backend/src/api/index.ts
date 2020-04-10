import { Router } from 'express'

import getUser from './middleware/getUser'
import authRouter from './routes/auth'
import userRouter from './routes/user/index'
import managerRouter from './routes/manager'
import dashboardRouter from './routes/dashboard'

export default () => {
    const app = Router()

    app.use(getUser)

    authRouter(app)
    userRouter(app)
    managerRouter(app)
    dashboardRouter(app)

    return app
}