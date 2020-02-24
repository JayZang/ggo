import { EntityRepository, Repository, getCustomRepository } from 'typeorm'
import _ from 'lodash'

import Policy from '@/entity/Policy'

@EntityRepository(Policy)
class PolicyRepository extends Repository<Policy> {

}

export default PolicyRepository