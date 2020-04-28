import { Service } from "typedi";
import { getCustomRepository } from "typeorm";

import { WorkReportActions, LineOperationState, CommandTypes } from "@/contract/line";
import WorkReportRepo from "@/repository/WorkReportRepository";
import { LineBotHelper } from "@/helper/LineBotHelper";
import User from "@/entity/User";
import TaskRepo from "@/repository/TaskRepository";
import TaskHelper from "@/helper/TaskHelper";
import { TaskStatus } from "@/entity/Task";
import { UserHelper } from "@/helper/UserHelper";
import getOperationWithErrorStateMessage from "@/linebot-messages/getOperationWithErrorStateMessage";
import getOperationWithInvalidIdentityMessage from "@/linebot-messages/getOperationWithInvalidIdentityMessage";
import getTasksSelectionMessage from "@/linebot-messages/getTasksSelectionMessage";

@Service()
export default class WorkReportService {

    async execute(user: User, action: string, parameter?: string) {
        switch (action) {
            case WorkReportActions.START_EDITION:
                return this.handleStartEdition(user)

            case WorkReportActions.SELECT_TASK:
                return

            case WorkReportActions.COMPLETE_EDITION:
                return this.handleEditionCompleted(user)

            case WorkReportActions.CANCEL_EDITION:
                return

            default:
                return
        }
    }

    private async handleStartEdition(user: User) {
        const taskRepo = getCustomRepository(TaskRepo)
        const state = await LineBotHelper.getOperationState(user.line_user_id)

        if (state !== LineOperationState.NONE)
            return getOperationWithErrorStateMessage(state) 
            
        if (!UserHelper.isIdentityForMember(user.identity_type))
            return getOperationWithInvalidIdentityMessage()

        const [ tasks ] = await Promise.all([
            TaskHelper.getMemberAssignableCondition(user.identity_id)
                .then(assignmentConditions => 
                    taskRepo.initQueryBuilder()
                        .withAssignmentCondition(assignmentConditions)
                        .withStatusCondition(TaskHelper.avaliableStatusToSubmitWorkReport)
                        .withCreateAtOrder('DESC')
                        .limit(10)
                        .offset(0)
                        .getMany()
                ),
            LineBotHelper.setOperationState(
                user.line_user_id, 
                LineOperationState.WORK_REPORT_TASK_SELECTING
            ),
        ])

        console.log(tasks)

        return getTasksSelectionMessage(
            tasks, 
            `${CommandTypes.WORK_REPORT}:${WorkReportActions.SELECT_TASK}`
        )
    }

    private async handleEditionCompleted(user: User) {
        const state = await LineBotHelper.getOperationState(user.line_user_id)

        if (state === LineOperationState.NONE)
            return getOperationWithErrorStateMessage(state, '請先點選"開始編輯"並選擇工作任務 ')
        else if (state !== LineOperationState.WORK_REPORT_EDITING)
            return getOperationWithErrorStateMessage(state)

        await LineBotHelper.setOperationState(
            user.line_user_id, 
            LineOperationState.WORK_REPORT_EDITING
        )

        return Promise.resolve(null)
    }
}