import { getCustomRepository } from 'typeorm'
import { Service } from 'typedi'
import _ from 'lodash'

import PolicyRepo from '@/repository/PolicyRepository'
import GroupRepo from '@/repository/GroupRepository'

@Service()
export default class IAMService {

    /**
     * Get iam policies
     */
    public async getPolicies() {
        try {
            const policyRepo = getCustomRepository(PolicyRepo)
            return await policyRepo.find()
        } catch (err) {
            console.log(err)
            console.log('Get iam policies error')
            return null
        }
    }

    /**
     * Get iam groups
     */
    public async getGroups() {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            return await groupRepo.findWithPolicies()
        } catch (err) {
            console.log(err)
            console.log('Get iam groups error')
            return null
        }
    }

    /**
     * Create iam group
     */
    public async createGroup(data: any) {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            const policyRepo = getCustomRepository(PolicyRepo)
            const policies = await policyRepo.findByIds(data.policy_ids)
            const group =  groupRepo.create({
                name: data.name,
                description: data.description || null,
                policies
            })
            return groupRepo.save(group)
        } catch (err) {
            console.log(err)
            console.log('Create iam group error')
            return null
        }
    }

    /**
     * Update iam group
     */
    public async updateGroup(id: string | number, data: any) {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            const policyRepo = getCustomRepository(PolicyRepo)
            const group =  await groupRepo.findOneOrFail(id)
            const policies = await policyRepo.findByIds(data.policy_ids)
            Object.assign(group, _.pick(data, [
                'name',
                'description'
            ]))
            group.policies = policies
            return groupRepo.save(group)
        } catch (err) {
            console.log(err)
            console.log('Update iam group error')
            return null
        }
    }

    /**
     * Delete iam group
     */
    public async deleteGroup(ids: string[] | number[]) {
        try {
            const groupRepo = getCustomRepository(GroupRepo)
            const groups =  await groupRepo.findByIds(ids)
            await groupRepo.remove(groups)
            return groups
        } catch (err) {
            console.log(err)
            console.log('Delete iam group error')
            return null
        }
    }
}