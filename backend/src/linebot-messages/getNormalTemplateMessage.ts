import { Message, FlexComponent } from '@line/bot-sdk'

export default function (title: string, description?: string): Message | Message[] {
    const contents: FlexComponent[] = [{
        type: "text",
        text: title,
        weight: "bold",
        size: "xl",
        align: "center",
        wrap: true
    }]

    description && contents.push({
        type: 'text',
        text: `${description}`,
        size: 'sm',
        color: '#666666',
        margin: 'md',
        align: 'center',
        wrap: true
    })

    return {
        type: 'flex',
        altText: '訊息',
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