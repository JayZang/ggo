import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import Project from '@/entity/Project'

@EntityRepository(Project)
class ProjectRepository extends Repository<Project> {
    
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
}

export default ProjectRepository