import { getCustomRepository, In } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import TaskRepo from '@/repository/TaskRepository'
import UserRepo from '@/repository/UserRepository'
import User, { UserIdentityType } from '@/entity/User'
import Task, { TaskStatus } from '@/entity/Task'
import { TaskAssignmentType } from '@/entity/TaskAssignment'

@Service()
export default class UserService {

    /**
     * Get user's tasks
     * only admin and member identity return tasks
     */
    public async getTasks(user: User) {
        try {
            const taskRepo = getCustomRepository(TaskRepo).initQueryBuilder()

            let tasks: Task[] = []

            if ([
                UserIdentityType.admin,
                UserIdentityType.member
            ].includes(user.identity_type)) {
                switch (user.identity_type) {
                    case UserIdentityType.admin:
                        taskRepo.withAssignmentRelation()
                        break
    
                    case UserIdentityType.member:
                        taskRepo.withAssignmentCondition(TaskAssignmentType.Member, user.identity!.id)
                        break
                }

                tasks = await taskRepo
                    .withProjectRelation()
                    .withStatusCondition([TaskStatus.Normal, TaskStatus.Pause])
                    .withCreateAtOrder('DESC')
                    .getMany()
                    .then(tasks => taskRepo.attachTasksAssignment(tasks))
            }

            return tasks
        } catch (err) {
            console.log('Get user tasks fail')
            console.log(err.toString())
            return null
        }
    }
}