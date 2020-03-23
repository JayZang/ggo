import { getCustomRepository } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import TaskRepo from '@/repository/TaskRepository'
import UserRepo from '@/repository/UserRepository'
import User, { UserIdentityType } from '@/entity/User'
import Task from '@/entity/Task'
import { TaskAssignmentType } from '@/entity/TaskAssignment'

@Service()
export default class UserService {

    /**
     * Get user's tasks
     */
    public async getTasks(user: User, option?: {
        skip: number,
        take: number,
    }) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)

            let tasksAndCount: [ 
                Task[], 
                number 
            ] = [[], 0]

            switch (user.identity_type) {
                case UserIdentityType.admin:
                    tasksAndCount = await taskRepo.findAndCount({ 
                        relations: ['assignment'],
                        ...option
                    })
                    await taskRepo.attachTasksAssignment(tasksAndCount[0])
                    break

                case UserIdentityType.member:
                    tasksAndCount =  await taskRepo.getByAssignment(TaskAssignmentType.Member, user.identity!.id, option)
                    break
            }

            return tasksAndCount
        } catch (err) {
            console.log('Get user tasks fail')
            console.log(err.toString())
            return null
        }
    }
}