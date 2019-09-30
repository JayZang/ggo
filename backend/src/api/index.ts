import { Router } from 'express'

import memberRouter from './routes/member'

export default () => {
  const app = Router()

  memberRouter(app)

  return app
}