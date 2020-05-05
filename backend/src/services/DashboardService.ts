import { getCustomRepository } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import TaskHelper from '@/helper/TaskHelper'
import { UserHelper } from '@/helper/UserHelper'
import TaskRepo from '@/repository/TaskRepository'
import ProjectRepo from '@/repository/ProjectRepository'
import WorkReportRepo from '@/repository/WorkReportRepository'
import { TaskStatus } from '@/entity/Task'
import User, { UserIdentityType } from '@/entity/User'

@Service()
export default class DashboardService {

    /**
     * Get dashboard tasks
     * only user who is member return tasks
     */
    public async getInProgressTasks(user: User) {
        try {
            const taskRepo = getCustomRepository(TaskRepo).initQueryBuilder()

            if (user.identity_type === UserIdentityType.admin)
                taskRepo.withAssignmentRelation()
            else if (UserHelper.isIdentityForMember(user.identity_type)) {
                const memberId = user.identity!.id
                taskRepo.withAssignmentCondition(
                    await TaskHelper.getMemberAssignableCondition(memberId)
                )
            } else
                return null

            return await taskRepo
                .withStatusCondition([TaskStatus.Normal, TaskStatus.Pause])
                .withProjectRelation()
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
     * only user who is member and project manager return projects
     */
    public async getInProgressProjects(user: User) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo).initQueryBuilder()

            if (UserHelper.isIdentityForMember(user.identity_type)) {
                const memberId = user.identity!.id
                projectRepo.withManagerCondition(memberId)
            } else if (user.identity_type !== UserIdentityType.admin)
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

            if (UserHelper.isIdentityForMember(user.identity_type))
                workReportRepo.withSubmitterIdCondition(user.identity_id)
            else if (user.identity_type !== UserIdentityType.admin)
                return null

            return await workReportRepo
                .withTaskRelation()
                .withSubmitterRelation()
                .withCreateAtOrder('DESC')
                .take(10)
                .getMany()
        } catch (err) {
            console.log('Get dashboard work reports fail')
            console.log(err.toString())
            return null
        }
    }
}