import { Router } from 'express'

import memberRouter from './routes/member'
import teamRouter from './routes/team'

export default () => {
  const app = Router()

  memberRouter(app)
  teamRouter(app)

  return app
}