import { Message } from "@line/bot-sdk";
import { Moment } from "moment";
import { CommandTypes, WorkReportActions } from "@/contract/line";

export default function (workReport: {
    title: string
    content: string
    startTime: Moment
    endTime: Moment
}): Message | Message[] {
    const {
        title,
        content,
        startTime,
        endTime
    } = workReport

    return {
        type: 'flex',
        altText: '訊息',
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [{
                    type: 'text',
                    text: '確認工作報告',
                    size: 'sm',
                    color: '#1DB446',
                    weight: 'bold'
                }, {
                    type: "text",
                    text: title,
                    weight: "bold",
                    size: "xxl",
                    align: "start",
                    wrap: true,
                    margin: 'xl'
                }, {
                    type: "text",
                    text: `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`,
                    weight: "bold",
                    size: "sm",
                    align: "start",
                    color: '#aaaaaa',
                    // wrap: true,
                    margin: 'sm'
                }, {
                    type: 'separator',
                    margin: 'sm'
                }, {
                    type: "text",
                    text: content,
                    weight: "bold",
                    size: "lg",
                    align: "start",
                    color: '#666666',
                    wrap: true,
                    margin: 'lg'
                }]
            },
            footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [{
                    type: 'box',
                    layout: 'horizontal',
                    contents: [{
                        type: "button",
                        style: "primary",
                        height: "sm",
                        color: '#aaaaaa',
                        action: {
                            type: "message",
                            label: "放棄",
                            text: `${CommandTypes.WORK_REPORT}:${WorkReportActions.CANCEL_EDITION}`
                        }
                    }, {
                        type: "button",
                        style: "primary",
                        height: "sm",
                        margin: 'md',
                        action: {
                            type: "message",
                            label: "確認",
                            text: `${CommandTypes.WORK_REPORT}:${WorkReportActions.CONFIRM_EDITION}`
                        }
                    }]
                }, {
                    type: "spacer",
                    size: "sm"
                }],
                flex: 0
            }
        }
    }
}