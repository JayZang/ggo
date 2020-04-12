import { getCustomRepository, In } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import ProjectRepo from '@/repository/ProjectRepository'
import TaskRepo from '@/repository/TaskRepository'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import User, { UserIdentityType } from '@/entity/User'
import { TaskStatus } from '@/entity/Task'
import TeamRepo from '@/repository/TeamRepository'
import WorkReportRepo from '@/repository/WorkReportRepository'
import TaskHelper from '@/helper/TaskHelper'

@Service()
export default class DashboardService {

    /**
     * Get dashboard tasks
     * only user who has task permission and member identity return tasks
     */
    public async getInProgressTasks(user: User) {
        try {
            const taskRepo = getCustomRepository(TaskRepo).initQueryBuilder()

            if (!user.permissions.task_management && user.identity_type !== UserIdentityType.member)
                return null
            else if (user.permissions.task_management)
                taskRepo.withAssignmentRelation()
            else if (user.identity_type === UserIdentityType.member) {
                const memberId = user.identity!.id
                const teamRepo = getCustomRepository(TeamRepo)
                const teams = await teamRepo.getByMember(memberId)
                
                taskRepo.withAssignmentCondition([{
                    type: TaskAssignmentType.Member,
                    targetIds: [memberId]
                }, {
                    type: TaskAssignmentType.Team,
                    targetIds: teams.map(team => team.id)
                }])
            }

            return await taskRepo
                .withProjectRelation()
                .withStatusCondition([TaskStatus.Normal, TaskStatus.Pause])
                .withCreateAtOrder('DESC')
                .getMany()
                .then(tasks => TaskHelper.attachTasksAssignment(tasks))
        } catch (err) {
            console.log('Get dashboard tasks fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get dashboard projects
     * only user who has project permission return tasks
     */
    public async getInProgressProjects(user: User) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)

            if (!user.permissions.project_management)
                return null

            return await projectRepo
                .initQueryBuilder()
                .withFinishedCondition(false)
                .withCustomerRelation()
                .withTaskRelation()
                .withCreateAtOrder('DESC')
                .getMany()
        } catch (err) {
            console.log('Get dashboard projects fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get dashboard work reports
     * only user who has task permission and member identity return work reports
     */
    public async getLatestWorkReport(user: User) {
        try {
            const workReportRepo = getCustomRepository(WorkReportRepo).initQueryBuilder()

            if (!user.permissions.task_management && user.identity_type !== UserIdentityType.member)
                return null
            else if (user.identity_type === UserIdentityType.member)
                workReportRepo.withSubmitterIdCondition(user.identity_id)

            return await workReportRepo
                .withTaskRelation()
                .withSubmitterRelation()
                .withCreateAtOrder('DESC')
                .limit(10)
                .getMany()
        } catch (err) {
            console.log('Get dashboard work reports fail')
            console.log(err.toString())
            return null
        }
    }
}