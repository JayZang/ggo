import Container from "typedi"
import { TextEventMessage, MessageEvent, Client, Message } from "@line/bot-sdk"

export const opStateHandlerRegister: {
    state: LineOperationState,
    action: (lineUserId: string, message: string) => Promise<null | undefined | Message | Message[]>
}[] = []

import AuthService from "@/services/AuthService"
import WorkReportService from "@/services/Line/WorkReportService"
import getAccountLinkMessage from "@/linebot-messages/getAccountLinkMessage"
import getUserNotFoundMessage from "@/linebot-messages/getUserNotFoundMessage"
import { CommandTypes, LineOperationState } from "@/contract/line"
import { LineBotHelper } from "@/helper/LineBotHelper"

const authService = Container.get(AuthService)
const workReportService = Container.get(WorkReportService)

export default class TextEventMessageResolver {
    client: Client
    event: MessageEvent
    commandTypes: string
    commandAction: string
    commandParameter: string

    constructor(client: Client, event: MessageEvent) {        
        const parsedCommand = (event.message as TextEventMessage).text.split(':')
        
        this.client = client
        this.event = event
        this.commandTypes = parsedCommand[0]
        this.commandAction = parsedCommand[1]
        this.commandParameter = parsedCommand[2]
    }

    async resolve() {
        const { client, event } = this
        const message = event.message as TextEventMessage
        const text = message.text
        const commandTypes = this.commandTypes

        if (commandTypes === CommandTypes.ACCOUNT_LINK) 
            return this.handleAccountLink()
        else if (commandTypes === CommandTypes.WORK_REPORT)
            return this.handleWorkReportCommand()

        const replyMessage = await TextEventMessageResolver.execOpStateHandler(event.source.userId, text)

        return replyMessage ?
            client.replyMessage(event.replyToken, replyMessage) :
            Promise.resolve(null)
    }

    private static async execOpStateHandler(lineUserId: string, message: string) {
        const state = await LineBotHelper.getOperationState(lineUserId)
        let replyMessage: null | undefined | Message | Message[] = null

        for (let i = 0; i < opStateHandlerRegister.length; i++) {
            if (opStateHandlerRegister[i].state === state) {
                replyMessage = await opStateHandlerRegister[i].action(lineUserId, message)
                break
            }
        }

        return replyMessage
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

    private async handleWorkReportCommand() {
        const { client, event } = this
        const userId = event.source.userId
        const user = await authService.getUserByLineUserId(userId)

        if (!user)
            return this.replyUserNotFoundMessage()

        const replyMessage = await workReportService.execute(
            user,
            this.commandAction, 
            this.commandParameter
        )

        return replyMessage ?
            client.replyMessage(event.replyToken, replyMessage) :
            Promise.resolve(null)
    }

    private replyUserNotFoundMessage() {
        const { client, event } = this
        return client.replyMessage(event.replyToken, getUserNotFoundMessage())
    }
} 