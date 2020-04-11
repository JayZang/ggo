import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import WorkReportRepo from '@/repository/WorkReportRepository'
import TeamRepo from '@/repository/TeamRepository'
import TaskRepo from '@/repository/TaskRepository'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import { TaskStatus } from '@/entity/Task'
import Member from '@/entity/Member'
import TaskHelper from '@/helper/TaskHelper'

@Service()
export default class MemberTaskService {

    /**
     *  get member's tasks 
     */
    public async get(member: Member, option: {
        take: number
        skip: number
    }) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const assignmentConditions = await this.getTaskAssignmentConditions(member.id)
 
            return await taskRepo
                .initQueryBuilder()
                .withAssignmentCondition(assignmentConditions)
                .withProjectRelation()
                .withCreateAtOrder('DESC')
                .offset(option.skip)
                .limit(option.take)
                .getManyAndCount()
                .then(async ([tasks, count]) => ({
                    tasks: await TaskHelper.attachTasksAssignment(tasks),
                    count
                }))
        } catch (err) {
            console.log("Get user member's tasks fail")
            console.log(err)
            return null
        }
    }

    /**
     * get member's task simple statistic
     */
    public async getTaskSimpleStatistic(member: Member) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const workReportRepo = getCustomRepository(WorkReportRepo)
            const assignmentConditions = await this.getTaskAssignmentConditions(member.id)

            const [
                countOfTotal,
                countOfCompleted,
                countOfProcessing,
                countOfWorkReport
            ] = await Promise.all([
                taskRepo.initQueryBuilder()
                    .withAssignmentCondition(assignmentConditions)
                    .getCount(),
                taskRepo.initQueryBuilder()
                    .withStatusCondition([TaskStatus.Completed])
                    .withAssignmentCondition(assignmentConditions)
                    .getCount(),
                taskRepo.initQueryBuilder()
                    .withStatusCondition([TaskStatus.Normal])
                    .withAssignmentCondition(assignmentConditions)
                    .getCount(),
                workReportRepo.initQueryBuilder()
                    .withSubmitterIdCondition(member.id)
                    .getCount()
            ])

            return {
                countOfTotal,
                countOfCompleted,
                countOfProcessing,
                countOfWorkReport
            }
        } catch (err) {
            console.log("Get member's task simple statistic fail")
            console.log(err)
            return null
        }
    }

    /**
     * get one member's task
     */
    public async getOne(member: Member, taskId: number | string) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)

            const task = await taskRepo
                .initQueryBuilder()
                .withIdCondition(taskId)
                .withAssignmentRelation()
                .withProjectRelation()
                .withWorkReportRelation()
                .withWorkReportOrder('create_at', 'DESC')
                .getOne()

            if (!task) return null

            const isAvailable = await TaskHelper.isTaskAvailableByMember(task, member.id)

            if (!isAvailable) return null

            return (await TaskHelper.attachTasksAssignment([task]))[0]
        } catch (err) {
            console.log("Get one member's task fail")
            console.log(err)
            return null
        }
    }

    private async getTaskAssignmentConditions(memberId: number) {
        const teamRepo = getCustomRepository(TeamRepo)
        const teams = await teamRepo.getByMember(memberId)

        return [{
            type: TaskAssignmentType.Member,
            targetIds: [memberId]
        }, {
            type: TaskAssignmentType.Team,
            targetIds: teams.map(team => team.id)
        }]
    }
}