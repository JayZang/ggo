import { EntityRepository, Repository, getCustomRepository } from 'typeorm'
import _ from 'lodash'

import User from '@/entity/User'

@EntityRepository(User)
class UserRepository extends Repository<User> {

}

export default UserRepository