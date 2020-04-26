import { WebhookEvent, Client } from "@line/bot-sdk";
import MessageEventResolver from "./MessageEventResolver.ts";
import FollowEventResolver from "./FollowEventResolver";

export default class WebHookResolver {
    client: Client
    event: WebhookEvent

    constructor(client: Client, event: WebhookEvent) {
        this.client = client
        this.event = event
    }

    resolve() {
        const { client, event } = this
        
        if (event.type === 'message')
            return new MessageEventResolver(client, event).resolve()
        else if (event.type === 'follow')
            return new FollowEventResolver(client, event).resolve()

        return Promise.resolve(null)
    }
}