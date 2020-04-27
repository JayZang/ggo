import { Client, AccountLinkEvent } from "@line/bot-sdk"
import Container from "typedi"

import AuthService from "@/services/AuthService"
import getAccountLinkSuccessMessage from "@/linebot-messages/getAccountLinkSuccessMessage"

const authService = Container.get(AuthService)

export default class AccountLinkEventResolver {
    client: Client
    event: AccountLinkEvent

    constructor(client: Client, event: AccountLinkEvent) {
        this.client = client
        this.event = event
    }

    async resolve() {
        const { client, event } = this
        const nonce = event.link.nonce

        if (event.link.result === 'failed')
            return Promise.resolve(null)

        const user = await authService.linkLineAccount(nonce, event.source.userId) 

        if (!user)
            return Promise.resolve(null)

        return client.replyMessage(event.replyToken, getAccountLinkSuccessMessage());
    }
}