import { getCustomRepository } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import PolicyRepo from '@/repository/PolicyRepository'

@Service()
export default class IAMService {

    /**
     * Get policies
     */
    public async getPolicies() {
        try {
            const policyRepo = getCustomRepository(PolicyRepo)
            return await policyRepo.find()
        } catch (err) {
            console.log(err)
            return null
        }
    }
}