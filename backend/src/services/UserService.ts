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
     */
    public async getTasks(user: User) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)

            let tasks: Task[]

            switch (user.identity_type) {
                case UserIdentityType.admin:
                    tasks = await  taskRepo
                        .initQueryBuilder()
                        .withAssignmentRelation()
                        .withProjectRelation()
                        .withStatusCondition([TaskStatus.Normal, TaskStatus.Pause])
                        .withCreateAtOrder('DESC')
                        .getMany()
                        .then(tasks => taskRepo.attachTasksAssignment(tasks))
                    break

                case UserIdentityType.member:
                    [tasks] =  await taskRepo.getByAssignment(TaskAssignmentType.Member, user.identity!.id)
                    break
            }

            return tasks
        } catch (err) {
            console.log('Get user tasks fail')
            console.log(err.toString())
            return null
        }
    }
}