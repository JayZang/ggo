import _ from 'lodash'
import { EntityRepository } from 'typeorm'

import { BaseRepository } from './BaseRepocitory'
import Member, { MemberStatus } from '@/entity/Member'

@EntityRepository(Member)
class MemberRepository extends BaseRepository<Member> {
    protected teamsAlias = 'teams'
    protected teamsAsLeaderAlias = 'teamsAsLeader'
    protected emergencyContactsAlias = 'emergencyContacts'

    /**
     * Create and save a  new member
     * 
     * @param data    Member data
     */
    async createAndSave(data: any) {
        const member = this.create()

        Object.assign(member, _.pick(data, [
            'name',
            'gender',
            'avatar',
            'phone',
            'email',
            'birthday',
            'take_office_date',
            'leave_office_date'
        ]))
        member.status = MemberStatus.active

        return this.save(member)
    }

    /**
     * Update a member by id
     * 
     * @param id         Member id
     * @param data    Member data
     */
    async updateById(id: number | string, data: any) {
        const member = await this.findOne(id)

        if (!member) return Promise.reject('Member not found')

        Object.assign(member, _.pick(data, [
            'name',
            'gender',
            'avatar',
            'phone',
            'email',
            'birthday',
            'take_office_date',
            'leave_office_date'
        ]))

        return this.save(member)
    }

    withTeamsRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.teams`, this.teamsAlias)
        return this
    }

    withTeamsAsLeaderRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.teams_as_leader`, this.teamsAsLeaderAlias)
        return this
    }

    withEmergencyContactsRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.emergencyContacts`, this.emergencyContactsAlias)
        return this
    }
}

export default MemberRepository