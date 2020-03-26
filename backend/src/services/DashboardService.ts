import { getCustomRepository, In } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import { regularizeCustomerData } from '@/utils/data-regularizer/customer'
import ProjectRepo from '@/repository/ProjectRepository'
import TaskRepo from '@/repository/TaskRepository'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import User, { UserIdentityType } from '@/entity/User'
import { TaskStatus } from '@/entity/Task'

@Service()
export default class DashboardService {

    /**
     * Get dashboard tasks
     * only admin and member identity return tasks
     */
    public async getInProgressTasks(user: User) {
        try {
            const taskRepo = getCustomRepository(TaskRepo).initQueryBuilder()

            if (![
                UserIdentityType.admin,
                UserIdentityType.member
            ].includes(user.identity_type))
                return null
            else if (user.identity_type === UserIdentityType.admin)
                taskRepo.withAssignmentRelation()
            else if (user.identity_type === UserIdentityType.member)
                taskRepo.withAssignmentCondition(TaskAssignmentType.Member, user.identity!.id)

            return await taskRepo
                .withProjectRelation()
                .withStatusCondition([TaskStatus.Normal, TaskStatus.Pause])
                .withCreateAtOrder('DESC')
                .getMany()
                .then(tasks => taskRepo.attachTasksAssignment(tasks))
        } catch (err) {
            console.log('Get dashboard tasks fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get dashboard projects
     * only admin identity return tasks
     */
    public async getInProgressProjects(user: User) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)

            if (user.identity_type !== UserIdentityType.admin)
                return null

            return await projectRepo
                .initQueryBuilder()
                .withFinishedCondition(false)
                .withCustomerRelation()
                .withTaskRelation()
                .withCreateAtOrder('DESC')
                .getMany()
                .then(projects => projects.map(project => {
                    project.customer = project.customer && regularizeCustomerData(project.customer)
                    return project
                }))
        } catch (err) {
            console.log('Get dashboard projects fail')
            console.log(err.toString())
            return null
        }
    }
}