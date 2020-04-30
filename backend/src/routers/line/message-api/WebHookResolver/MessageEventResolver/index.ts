import { MessageEvent, Client } from "@line/bot-sdk"

import TextEventMessageResolver from "./TextEventMessageResolver"

export default class MessageEventResolver {
    client: Client
    event: MessageEvent

    constructor(client: Client, event: MessageEvent) {
        this.client = client
        this.event = event
    }

    resolve() {
        const { client, event } = this

        if (event.message.type === 'text')
            return new TextEventMessageResolver(client, event).resolve()

        return Promise.resolve(null)
    }
}