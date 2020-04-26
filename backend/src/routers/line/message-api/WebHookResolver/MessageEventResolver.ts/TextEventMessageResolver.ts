import Container from "typedi"
import { TextEventMessage, MessageEvent, Client } from "@line/bot-sdk"

import AuthService from "@/services/AuthService"
import getAccountLinkMessage from "@/linebot-messages/getAccountLinkMessage"
import getUserNotFoundMessage from "@/linebot-messages/getUserNotFoundMessage"

const authService = Container.get(AuthService)

export default class TextEventMessageResolver {
    client: Client
    event: MessageEvent

    constructor(client: Client, event: MessageEvent) {
        this.client = client
        this.event = event
    }

    resolve() {
        const { client, event } = this
        const message =  event.message as TextEventMessage
        const text = message.text

        if (text === '綁定帳號') 
            return this.handleAccountLink()
        else if (text === '工作報告')
            return this.handleWorkReportStart()
 
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text
        })
    }

    private async handleAccountLink() {
        const { client, event } = this
        const userId = event.source.userId
        const user = await authService.getUserByLineUserId(userId)

        if (user)
            return Promise.resolve(null)

        const linkToken = await this.client.getLinkToken(event.source.userId)

        return client.replyMessage(event.replyToken, getAccountLinkMessage(linkToken))
    }

    private async handleWorkReportStart() {
        const { client, event } = this
        const userId = event.source.userId
        const user = await authService.getUserByLineUserId(userId)

        if (!user)
            return this.replyUserNotFoundMessage()
    }

    private replyUserNotFoundMessage() {
        const { client, event } = this
        return client.replyMessage(event.replyToken, getUserNotFoundMessage())
    }
} 