import { Router, Request, Response } from 'express'
import { middleware, Client, WebhookEvent } from '@line/bot-sdk'

import { line as lineConfig } from '@/config'
import WebHookResolver from './WebHookResolver'

export default () => {
    const router = Router()
    const lineClient = new Client(lineConfig.messageApi)

    router.post('/webhook', middleware(lineConfig.messageApi), async (req: Request, res: Response) => {
        Promise
            .all(req.body.events.map((event: WebhookEvent) => 
                new WebHookResolver(lineClient, event).resolve()
            ))
            .then(result => res.json(result))
    })

    return router
}
