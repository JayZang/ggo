import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import { BaseRepository } from './BaseRepocitory'
import WorkReport from '@/entity/WorkReport'

@EntityRepository(WorkReport)
class WorkReportRepository extends BaseRepository<WorkReport> {
    protected submitterAlias = 'submitter'
    protected taskAlias = 'task'

    public withSubmitterRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.submitter`, this.submitterAlias)
        return this
    }

    public withTaskRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.task`, this.taskAlias)
        return this
    }

    public withSubmitterIdCondition(submitterId: number) {
        this.queryBuilder.andWhere(`${this.entityAlias}.submitter_id = :submitterId`, { submitterId })
        return this
    }
}

export default WorkReportRepository