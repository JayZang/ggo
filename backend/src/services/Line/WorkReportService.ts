import { getCustomRepository } from "typeorm";
import moment from 'moment'

import User from "@/entity/User";
import TaskHelper from "@/helper/TaskHelper";
import { UserHelper } from "@/helper/UserHelper";
import { LineBotHelper } from "@/helper/LineBotHelper";
import TaskRepo from "@/repository/TaskRepository";
import getTasksSelectionMessage from "@/linebot-messages/getTasksSelectionMessage";
import getNormalTemplateMessage from "@/linebot-messages/getNormalTemplateMessage";
import getWorkReportConfirmMessage from "@/linebot-messages/getWorkReportConfirmMessage";
import getOperationWithErrorStateMessage from "@/linebot-messages/getOperationWithErrorStateMessage";
import getOperationWithInvalidIdentityMessage from "@/linebot-messages/getOperationWithInvalidIdentityMessage";
import { opStateHandlerRegister } from "@/routers/line/message-api/WebHookResolver/MessageEventResolver/TextEventMessageResolver";
import { WorkReportActions, LineOperationState, CommandTypes } from "@/contract/line";
import WorkReportRepo from "@/repository/WorkReportRepository";
import { client as redisClient } from '@/loaders/redis'
import getSystemErrorMessage from "@/linebot-messages/getSystemErrorMessage";
import { WorkReportSubmitFrom } from "@/entity/WorkReport";

export default class WorkReportService {

    async execute(user: User, action: string, parameter?: string) {
        if (!UserHelper.isIdentityForMember(user.identity_type))
            return getOperationWithInvalidIdentityMessage()

        switch (action) {
            case WorkReportActions.START_EDITION:
                return this.handleStartEdition(user)

            case WorkReportActions.SELECT_TASK:
                return this.handleTaskSelection(user, parameter)

            case WorkReportActions.COMPLETE_EDITION:
                return this.handleEditionCompleted(user)

            case WorkReportActions.CONFIRM_EDITION:
                return this.handleConfirmEdition(user)

            case WorkReportActions.CANCEL_EDITION:
                return this.handleCancelEdition(user)

            default:
                return
        }
    }

    private async handleStartEdition(user: User) {
        const taskRepo = getCustomRepository(TaskRepo)
        const state = await LineBotHelper.getOperationState(user.line_user_id)

        if (state !== LineOperationState.NONE)
            return getOperationWithErrorStateMessage(state) 

        const tasks = await TaskHelper.getMemberAssignableCondition(user.identity_id)
            .then(assignmentConditions => taskRepo.initQueryBuilder()
                .withAssignmentCondition(assignmentConditions)
                .withStatusCondition(TaskHelper.availableStatusToSubmitWorkReport)
                .withCreateAtOrder('DESC')
                .limit(10)
                .offset(0)
                .getMany())

        if (tasks.length === 0)
            return getNormalTemplateMessage('您無執行中之工作任務')

        await LineBotHelper.setOperationState(
            user.line_user_id, 
            LineOperationState.WORK_REPORT_TASK_SELECTING,
            180
        )

        return getTasksSelectionMessage(
            tasks, 
            `${CommandTypes.WORK_REPORT}:${WorkReportActions.SELECT_TASK}`
        )
    }

    private async handleTaskSelection(user: User, taskId: number | string) {
        const state = await LineBotHelper.getOperationState(user.line_user_id)

        if (state === LineOperationState.NONE)
            return getOperationWithErrorStateMessage(state, '請重新點選"開始編輯"')
        else if (state !== LineOperationState.WORK_REPORT_TASK_SELECTING)
            return getOperationWithErrorStateMessage(state) 

        const taskRepo = getCustomRepository(TaskRepo)
        const task = await taskRepo.findOne(taskId, { relations: ['assignment'] })

        if (!task) {
            await LineBotHelper.setOperationState(user.line_user_id, LineOperationState.NONE)
            return getNormalTemplateMessage('無此工作任務', '請重新操作')
        } else if (!await TaskHelper.isTaskAvailableByMember(task, user.identity_id)) {
            await LineBotHelper.setOperationState(user.line_user_id, LineOperationState.NONE)
            return getNormalTemplateMessage('您非該工作任務擁有者', '請重新操作')
        }

        await Promise.all([
            LineBotHelper.setOperationState(
                user.line_user_id, 
                LineOperationState.WORK_REPORT_TITLE_EDITING,
                180
            ),
            new Promise((resolve, reject) => {
                redisClient.multi()
                    .hset(`line-work-report-edition:${user.line_user_id}`, 'taskId', task.id.toString())
                    .expire(`line-work-report-edition:${user.line_user_id}`, 180)
                    .exec(err => {
                        if (err) reject(err)
                        resolve()
                    })
            })
        ])

        return getNormalTemplateMessage('輸入工作報告標題')
    }

    private async handleEditionCompleted(user: User) {
        const state = await LineBotHelper.getOperationState(user.line_user_id)

        if (state === LineOperationState.NONE)
            return getOperationWithErrorStateMessage(state, '請先點選"開始編輯"並選擇工作任務')
       else if (state === LineOperationState.WORK_REPORT_TASK_SELECTING)
            return getOperationWithErrorStateMessage(state, '請先選擇欲提交報告之工作任務')
        else if (state !== LineOperationState.WORK_REPORT_CONTENT_EDITING)
            return getOperationWithErrorStateMessage(state)

        await LineBotHelper.setOperationState(
            user.line_user_id, 
            LineOperationState.WORK_REPORT_START_TIME_EDITING,
            120
        )

        return getNormalTemplateMessage('輸入工作起始時間', '範例格式：09:00')
    }

    private async handleConfirmEdition(user: User) {
        const state = await LineBotHelper.getOperationState(user.line_user_id)
        const workReportRepo = getCustomRepository(WorkReportRepo)
        const taskRepo = getCustomRepository(TaskRepo)

        if (state !== LineOperationState.WORK_REPORT_CONFIRM)
            return getOperationWithErrorStateMessage(state)

        const workReport: any = await new Promise((resolve, reject) => {
            redisClient
                .hgetall(`line-work-report-edition:${user.line_user_id}`, (err, workReport) => {
                    if (err) reject(err)
                    resolve(workReport)
                })
        })

        if (!workReport) {
            await this.clearState(user)
            return getSystemErrorMessage()
        }

        const task = await taskRepo.findOne(workReport.taskId)

        if (!task) {
            await this.clearState(user)
            return getSystemErrorMessage()
        }

        await workReportRepo.insert({
            title: workReport.title,
            content: workReport.content || '',
            submit_from: WorkReportSubmitFrom.Line,
            submitter_id: user.identity_id,
            start_time: workReport.startTime,
            end_time: workReport.endTime,
            task
        })

        await this.clearState(user)

        return getNormalTemplateMessage('工作報告提交完成')
    }

    private async handleCancelEdition(user: User) {
        const state = await LineBotHelper.getOperationState(user.line_user_id)

        if (![
            LineOperationState.WORK_REPORT_TASK_SELECTING,
            LineOperationState.WORK_REPORT_TITLE_EDITING,
            LineOperationState.WORK_REPORT_CONTENT_EDITING,
            LineOperationState.WORK_REPORT_START_TIME_EDITING,
            LineOperationState.WORK_REPORT_END_TIME_EDITING,
            LineOperationState.WORK_REPORT_CONFIRM,
        ].includes(state as any))
            return getOperationWithErrorStateMessage(state)

        await this.clearState(user)

        return getNormalTemplateMessage('已結束編輯')
    }

    private async clearState(user: User) {
        await Promise.all([
            LineBotHelper.setOperationState(
                user.line_user_id, 
                LineOperationState.NONE
            ),
            new Promise((resolve, reject) => {
                redisClient.del(`line-work-report-edition:${user.line_user_id}`, err => {
                    if (err) reject(err)
                    resolve()
                })
            })
        ])
    }
}

opStateHandlerRegister.push({
    state: LineOperationState.WORK_REPORT_TITLE_EDITING,
    action: async (lineUserId: string, message: string) => {
        await Promise.all([
            LineBotHelper.setOperationState(
                lineUserId, 
                LineOperationState.WORK_REPORT_CONTENT_EDITING,
                600
            ),
            new Promise((resolve, reject) => {
                redisClient.multi()
                    .hset(`line-work-report-edition:${lineUserId}`, 'title', message)
                    .expire(`line-work-report-edition:${lineUserId}`, 600)
                    .exec(err => {
                        if (err) reject(err)
                        resolve()
                    })
            })
        ])

        return getNormalTemplateMessage('輸入工作報告內容', 'P.S：送出文字等同於換行，編輯完畢請點選"完成編輯"')
    }
}, {
    state: LineOperationState.WORK_REPORT_CONTENT_EDITING,
    action: async (lineUserId: string, message: string) => {
        await Promise.all([
            LineBotHelper.setOperationState(
                lineUserId, 
                LineOperationState.WORK_REPORT_CONTENT_EDITING,
                600
            ),
            new Promise((resolve, reject) => {
                redisClient.hget(`line-work-report-edition:${lineUserId}`, 'content', (err, content) => {
                    if (err) reject(err)
                    content = (content ? `${content}\n`: '') + `${message}`
                    resolve(content)
                })
            }).then((content: string) => {
                return new Promise((resolve, reject) => {
                    redisClient.multi()
                        .hset(`line-work-report-edition:${lineUserId}`, 'content', content)
                        .expire(`line-work-report-edition:${lineUserId}`, 600)
                        .exec(err => {
                            if (err) reject(err)
                            resolve()
                        })
                })
            })
        ])

        return null
    }
}, {
    state: LineOperationState.WORK_REPORT_START_TIME_EDITING,
    action: async (lineUserId: string, message: string) => {
        const hours = parseInt(message.split(':')[0])
        const minutes = parseInt(message.split(':')[1]) || 0

        if (isNaN(hours) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60)
            return getNormalTemplateMessage('時間格式錯誤', '請重新輸入')

        const time = moment().hours(hours).minutes(minutes).format()

        await Promise.all([
            LineBotHelper.setOperationState(
                lineUserId, 
                LineOperationState.WORK_REPORT_END_TIME_EDITING,
                120
            ),
            new Promise((resolve, reject) => {
                redisClient.multi()
                    .hset(`line-work-report-edition:${lineUserId}`, 'startTime', time)
                    .expire(`line-work-report-edition:${lineUserId}`, 120)
                    .exec(err => {
                        if (err) reject(err)
                        resolve()
                    })
            })
        ])

        return getNormalTemplateMessage('輸入工作結束時間', '範例格式：18:00')
    }
}, {
    state: LineOperationState.WORK_REPORT_END_TIME_EDITING,
    action: async (lineUserId: string, message: string) => {
        const hours = parseInt(message.split(':')[0])
        const minutes = parseInt(message.split(':')[1]) || 0

        if (isNaN(hours) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60)
            return getNormalTemplateMessage('時間格式錯誤', '請重新輸入')

        const time = moment().hours(hours).minutes(minutes)

        const workReport: any = await new Promise((resolve, reject) => {
            redisClient
                .hgetall(`line-work-report-edition:${lineUserId}`, (err, workReport) => {
                    if (err) reject(err)
                    resolve(workReport)
                })
        })

        if (!workReport) {
            await LineBotHelper.setOperationState(
                lineUserId, 
                LineOperationState.NONE
            )
            return getSystemErrorMessage()
        }

        workReport.startTime = moment(workReport.startTime)
        workReport.endTime = time

        if (time.isSameOrBefore(workReport.startTime))
            return getNormalTemplateMessage(`時間設置錯誤`, `請重新輸入，必須設置於 ${workReport.startTime.format('HH:mm')} 之後`)

        await Promise.all([
            LineBotHelper.setOperationState(
                lineUserId, 
                LineOperationState.WORK_REPORT_CONFIRM,
                600
            ),
            new Promise((resolve, reject) => {
                redisClient.multi()
                    .hset(`line-work-report-edition:${lineUserId}`, 'endTime', time.format())
                    .expire(`line-work-report-edition:${lineUserId}`, 600)
                    .exec(err => {
                        if (err) reject(err)
                        resolve()
                    })
            })
        ])

        return getWorkReportConfirmMessage(workReport)
    }
})