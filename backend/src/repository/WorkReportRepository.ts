import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import { BaseRepository } from './BaseRepocitory'
import WorkReport from '@/entity/WorkReport'

@EntityRepository(WorkReport)
class WorkReportRepository extends BaseRepository<WorkReport> {

    public withSubmitterIdCondition(submitterId: number) {
        this.queryBuilder.andWhere(`${this.entityAlias}.submitter_id = :submitterId`, { submitterId })
        return this
    }
}

export default WorkReportRepository