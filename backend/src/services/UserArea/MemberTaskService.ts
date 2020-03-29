import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import TeamRepo from '@/repository/TeamRepository'
import TaskRepo from '@/repository/TaskRepository'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import { TaskStatus } from '@/entity/Task'
import Member from '@/entity/Member'

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
            const assignmentConditions = await this.getTaskAssignemtConditions(member.id)
 
            return await taskRepo
                .initQueryBuilder()
                .withAssignmentCondition(assignmentConditions)
                .withProjectRelation()
                .withCreateAtOrder('DESC')
                .offset(option.skip)
                .limit(option.take)
                .getManyAndCount()
                .then(async ([tasks, count]) => ({
                    tasks: await taskRepo.attachTasksAssignment(tasks),
                    count
                }))
        } catch (err) {
            console.log("Get user mamber's tasks fail")
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
            const assignmentConditions = await this.getTaskAssignemtConditions(member.id)

            const [
                countOfTotal,
                countOfCompleted,
                countOfProcessing
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
                    .getCount()
            ])

            return {
                countOfTotal,
                countOfCompleted,
                countOfProcessing
            }
        } catch (err) {
            console.log("Get member's task simple statistic fail")
            console.log(err)
            return null
        }
    }

    private async getTaskAssignemtConditions(memberId: number) {
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