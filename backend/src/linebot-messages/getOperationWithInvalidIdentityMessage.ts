import { Message, FlexComponent } from '@line/bot-sdk'

export default function (): Message | Message[] {
    const contents: FlexComponent[] = [{
        type: "text",
        text: "無法執行該動作",
        weight: "bold",
        size: "xl",
        align: "center"
    }]

    contents.push({
        type: 'text',
        text: '當前使用者身份無權限進行此操作',
        size: 'sm',
        color: '#666666',
        margin: 'md',
        align: 'center'
    })

    return {
        type: 'flex',
        altText: '操作錯誤(使用者身份錯誤)',
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents
            }
        }
    }
}