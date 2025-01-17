import { Message } from '@line/bot-sdk'

import { system } from '@/config'

export default function (linkToken: string): Message | Message[] {
    return {
        type: 'flex',
        altText: '使用者登入',
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [{
                    type: "text",
                    text: "綁定帳號",
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
                        type: "uri",
                        label: "登入網站系統",
                        uri: `${system.appDomain}/line/account-link?linkToken=${linkToken}`
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