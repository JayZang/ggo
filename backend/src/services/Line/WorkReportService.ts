import { Service } from "typedi";
import { getCustomRepository } from "typeorm";

import { WorkReportActions, LineOperationState } from "@/contract/line";
import WorkReportRepo from "@/repository/WorkReportRepository";
import { LineBotHelper } from "@/helper/LineBotHelper";
import getOperationWithErrorState from "@/linebot-messages/getOperationWithErrorState";

@Service()
export default class WorkReportService {

    async execute(lineUserId: string, action: string, parameter?: string) {
        switch (action) {
            case WorkReportActions.START_EDITION:
                return this.handleStartEdition(lineUserId)

            case WorkReportActions.SELECT_TASK:
                return

            case WorkReportActions.COMPLETE_EDITION:
                return this.handleEditionCompleted(lineUserId)

            case WorkReportActions.CANCEL_EDITION:
                return

            default:
                return
        }
    }

    private async handleStartEdition(lineUserId: string) {
        const state = await LineBotHelper.getOperationState(lineUserId)

        if (state !== LineOperationState.NONE)
            return getOperationWithErrorState(state)
            
        await LineBotHelper.setOperationState(lineUserId, LineOperationState.WORK_REPORT_TASK_SELECTING)

        return Promise.resolve(null)
    }

    private async handleEditionCompleted(lineUserId: string) {
        const state = await LineBotHelper.getOperationState(lineUserId)

        if (state === LineOperationState.NONE)
            return getOperationWithErrorState(state, '請先點選"開始編輯"並選擇工作任務 ')
        else if (state !== LineOperationState.WORK_REPORT_EDITING)
            return getOperationWithErrorState(state)

        await LineBotHelper.setOperationState(lineUserId, LineOperationState.WORK_REPORT_EDITING)

        return Promise.resolve(null)
    }
}