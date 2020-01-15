import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import TaskRepo from '@/repository/TaskRepository'
import { TaskStatus } from '@/entity/Task'

@Service()
export default class TaskService {

    /**
     *  Create a task
     *  
     * @param data 
     */
    public async create(data: any) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)

            return await taskRepo.createAndSave(data)
        } catch (err) {
            console.log('Create task fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get tasks
     */
    public async get(option?: {
        skip: number,
        take: number,
    }) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const tasks = await taskRepo.find({
                relations: ['project', 'assignment'],
                order: {  create_at: 'DESC' },
                ...option
            })
            return await taskRepo.attachTasksAssignment(tasks)
        } catch (err) {
            console.log('Get tasks fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get tasks by project id
     * 
     * @param id 
     */
    public async getByProjectId(id: number) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            return await taskRepo.getByProject(id)
        } catch (err) {
            console.log('Get tasks by project id fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Update task status
     * 
     * @param taskId 
     * @param status 
     */
    public async updateStatus(taskId: string | number, status: TaskStatus) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const task = await taskRepo.findOneOrFail(taskId, {
                relations: ['project']
            })

            if (task.project.finish_datetime)
                throw new Error('The project that the task belongs to is finished !')

            task.status = status
            return await taskRepo.save(task)
        } catch (err) {
            console.log('Update task status fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get total number of tasks
     */
    public async getTotalCount() {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            return await taskRepo.count()
        } catch (err) {
            console.log('Get total number of tasks fail')
            console.log(err.toString())
            return null
        }
    }
}