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
     * Insert one Project
     *  
     * @param data
     */
    public async updateById(id: string, data: any) {
        const project = await this.findOne(id)

        if (!project) return Promise.reject('Project not found')

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
        Object.assign(project, _.pick(data, [
            'name',
            'description',
            'start_datetime',
            'deadline_datetime',
            'quote',
            'source_type',
            'customer',
            'remark'
        ]))
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