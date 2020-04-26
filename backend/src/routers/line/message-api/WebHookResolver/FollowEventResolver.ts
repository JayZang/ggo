import { Client, FollowEvent } from "@line/bot-sdk"

export default class FollowEventResolver {
    client: Client
    event: FollowEvent

    constructor(client: Client, event: FollowEvent) {
        this.client = client
        this.event = event
    }

    resolve() {
        const { client, event } = this

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: '歡迎追蹤'
        });
    }
}