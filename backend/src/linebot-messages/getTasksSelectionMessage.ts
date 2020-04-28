import { Message, FlexBubble } from "@line/bot-sdk";
import Task from "@/entity/Task";
import moment = require("moment");

export default function (tasks: Task[], command: string): Message | Message[]{
    return {
        type: 'flex',
        altText: '任務選單列表',
        contents: {
            type: 'carousel',
            contents: tasks.map(function (task): FlexBubble {
                return {
                    type: 'bubble',
                    header: {
                        type: 'box',
                        layout: 'vertical',
                        backgroundColor: '#27ACB2',
                        paddingTop: '19px',
                        paddingAll: '12px',
                        paddingBottom: '16px',
                        contents: [{
                            type: 'text',
                            text: '工作任務',
                            color: '#ffffff',
                            align: 'center',
                            size: 'xxl',
                            gravity: 'center',
                            weight: 'bold'
                        }, {
                            type: 'separator',
                            margin: 'lg'
                        }, {
                            type: 'text',
                            text: `名稱：${task.name}`,
                            color: '#ffffff',
                            align: 'start',
                            size: 'md',
                            gravity: 'center',
                            margin: 'xl'
                        }, {
                            type: 'text',
                            text: `期限：${moment(task.start_datetime).format('YYYY-MM-DD')} ~ ${moment(task.deadline_datetime).format('YYYY-MM-DD')}`,
                            color: '#ffffff',
                            align: 'start',
                            size: 'md',
                            gravity: 'center',
                            margin: 'md'
                        }]
                    },
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [{
                            type: 'box',
                            layout: 'horizontal',
                            contents: [{
                                type: 'text',
                                text: task.description || '無描述',
                                color: '#8C8C8C',
                                size: 'sm',
                                wrap: true
                            }]
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
                            color: '#27ACB2',
                            action: {
                                type: "message",
                                label: "選擇",
                                text: `${command}:${task.id}`
                            }
                        }, {
                            type: "spacer",
                            size: "sm"
                        }],
                        flex: 0
                    }
                }
            }),
        }
    }
}