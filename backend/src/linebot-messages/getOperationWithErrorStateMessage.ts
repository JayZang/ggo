import { Message, FlexComponent } from '@line/bot-sdk'

export default function (state: string, description?: string): Message | Message[] {
    const contents: FlexComponent[] = [{
        type: "text",
        text: "無法執行該動作",
        weight: "bold",
        size: "xl",
        align: "center"
    }]

    description && contents.push({
        type: 'text',
        text: `${description}`,
        size: 'sm',
        color: '#666666',
        margin: 'md',
        align: 'center'
    })

    contents.push({
        type: 'text',
        text: `當前狀態: ${state}`,
        size: 'sm',
        color: '#666666',
        margin: 'md',
        align: 'center'
    })

    return {
        type: 'flex',
        altText: '操作錯誤(非對應狀態)',
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