import { EntityRepository, Not, IsNull } from 'typeorm'
import _ from 'lodash'

import Project from '@/entity/Project'
import { BaseRepository } from './BaseRepocitory'

@EntityRepository(Project)
class ProjectRepository extends BaseRepository<Project> {
    
    /**
     * Insert one Project
     *  
     * @param data
     */
    public async createAndSave(data: any) {
        const project = this.create()

        this.assignValue(project, data)

        return this.save(project)
    }

    /**
     * Assign value to project
     * 
     * @param project 
     * @param data 
     */
    public assignValue(project: Project, data: any) {
        project.name = data.name
        project.description = data.description || null
        project.start_datetime = data.start_datetime
        project.deadline_datetime = data.deadline_datetime
        project.quote = data.quote || null
        project.source_type = data.source_type
        project.customer = data.customer
        project.remark = data.remark || null
    }

    public withFinishedCondition(isFinish: boolean) {
        this.queryBuilder.where({
            'finish_datetime': isFinish ? Not(null) : IsNull()
        })
        return this
    }

    public withTaskRelation() {
        this.queryBuilder
            .leftJoinAndSelect(`${this.entityAlias}.tasks`, 'tasks')
            .leftJoinAndSelect('tasks.assignment', 'taskAssignment')
        return this
    }

    public withCustomerRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.customer`, 'customer')
        return this
    }
}

export default ProjectRepository