import { EntityRepository, Repository, getCustomRepository, SelectQueryBuilder } from 'typeorm'
import _ from 'lodash'

import User from '@/entity/User'
import Policy from '@/entity/Policy'

@EntityRepository(User)
class UserRepository extends Repository<User> {

}

export default UserRepository