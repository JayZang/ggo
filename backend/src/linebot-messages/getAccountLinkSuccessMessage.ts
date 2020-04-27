import { Message } from '@line/bot-sdk'

export default function (): Message | Message[] {
    return {
        type: 'flex',
        altText: '綁定帳號完成',
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [{
                    type: "text",
                    text: "綁定帳號完成",
                    weight: "bold",
                    size: "xl",
                    align: "center"
                }]
            }
        }
    }
}