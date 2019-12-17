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

        return this.save(project)
    }
}

export default ProjectRepository