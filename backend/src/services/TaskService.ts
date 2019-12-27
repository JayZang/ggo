import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import TaskRepo from '@/repository/TaskRepository'

@Service()
export default class TaskService {

    /**
     * Get tasks by project id
     * 
     * @param id 
     */
    public async getByProjectId(id: number) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            return await taskRepo.find({
                project_id: id
            })
        } catch (err) {
            console.log('Get tasks by project id fail')
            console.log(err.toString())
            return 0
        }
    }
}