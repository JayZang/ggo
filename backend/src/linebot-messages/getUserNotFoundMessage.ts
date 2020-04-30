import { Message } from '@line/bot-sdk'
import { CommandTypes } from '@/contract/line'

export default function (): Message | Message[] {
    return {
        type: 'flex',
        altText: '綁定帳號',
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [{
                    type: "text",
                    text: "無法辨別使用者",
                    weight: "bold",
                    size: "xl",
                    align: "center"
                }]
            },
            footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [{
                    type: "button",
                    style: "primary",
                    height: "sm",
                    action: {
                        type: "message",
                        label: "綁定帳號",
                        text: CommandTypes.ACCOUNT_LINK
                    }
                }, {
                    type: "spacer",
                    size: "sm"
                }],
                flex: 0
            }
        }
    }
}