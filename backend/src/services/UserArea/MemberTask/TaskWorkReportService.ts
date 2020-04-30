import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import WorkReportRepo from '@/repository/WorkReportRepository'
import TaskRepo from '@/repository/TaskRepository'
import TaskHelper from '@/helper/TaskHelper'
import Member from '@/entity/Member'
import _ from 'lodash'
import { WorkReportSubmitFrom } from '@/entity/WorkReport'
import moment from 'moment'
import { TaskStatus } from '@/entity/Task'

@Service()
export default class TaskWorkReportService {

    /**
     * create a user member task work report
     */
    public async create(member: Member, taskId: number | string, data: any) {
        try {
            const workReportRepo = getCustomRepository(WorkReportRepo)
            const taskRepo = getCustomRepository(TaskRepo)

            const task = await taskRepo.findOneOrFail(taskId, { relations: ['assignment'] })
            const isAvailable = await TaskHelper.isTaskAvailableByMember(task, member.id)

            if (!isAvailable || !TaskHelper.availableStatusToSubmitWorkReport.includes(task.status)) 
                return null

            const workReport = workReportRepo.create()
            workReport.task_id = task.id
            workReport.submitter = member
            workReport.submit_from = WorkReportSubmitFrom.Web
            Object.assign(workReport, _.pick(data, [
                'title',
                'content',
                'start_time',
                'end_time'
            ]))

            return await workReportRepo.save(workReport)
        } catch (err) {
            console.log("Create a user member task work report fail")
            console.log(err)
            return null
        }
    }

    /**
     * edit a user member task work report
     */
    public async update(
        member: Member, 
        taskId: number | string, 
        workReportId: number | string, 
        data: any
    ) {
        try {
            const workReportRepo = getCustomRepository(WorkReportRepo)
            const taskRepo = getCustomRepository(TaskRepo)

            const task = await taskRepo.findOneOrFail(taskId, { relations: ['assignment'] })
            const isAvailable = await TaskHelper.isTaskAvailableByMember(task, member.id)

            if (!isAvailable || task.status !== TaskStatus.Normal) 
                return null

            const workReport = await workReportRepo.findOneOrFail(workReportId)

            if (task.id !== workReport.task_id ||
                member.id !== workReport.submitter_id ||
                !moment(workReport.create_at).isSame(moment(), 'day'))
                return null

            workReport.submitter = member
            Object.assign(workReport, _.pick(data, [
                'title',
                'content',
                'start_time',
                'end_time'
            ]))

            return await workReportRepo.save(workReport)
        } catch (err) {
            console.log("Edit a user member task work report fail")
            console.log(err)
            return null
        }
    }
}