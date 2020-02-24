import { EntityRepository, Repository, getCustomRepository } from 'typeorm'
import _ from 'lodash'

import Group from '@/entity/Group'

@EntityRepository(Group)
class GroupRepository extends Repository<Group> {
    public findWithPolicies() {
        return this.find({
            relations: ['policies']
        })
    }
}

export default GroupRepository