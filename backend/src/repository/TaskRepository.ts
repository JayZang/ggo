import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import Task from '@/entity/Task'

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
    
    /**
     * Insert one Project
     *  
     * @param data
     */
    // public async createAndSave(data: any) {
    //     const project = this.create()

    //     this.assignValue(project, data)

    //     return this.save(project)
    // }
}

export default TaskRepository