import { Router } from 'express'

import messageApiRouter from './message-api'

export default () => {
    const router = Router()

    router.use('/line', messageApiRouter())
    
    return router
}
