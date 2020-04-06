import { Service } from 'typedi'
import { getCustomRepository, ObjectLiteral } from 'typeorm'
import _ from 'lodash'

import MemberRepo from '@/repository/MemberRepository'
import EmergencyContactRepo from '@/repository/EmergencyContactRepository'
import { MemberStatus } from '@/entity/Member'
import TeamRepository from '@/repository/TeamRepository'
import UserRepo from '@/repository/UserRepository'
import { UserIdentityType } from '@/entity/User'
import MemberHelper from '@/helper/MemberHelper'

@Service()
export default class MemberService {

    /**
     * Create One Member
     */
    public async create(data: any) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)
            return await memberRepo.createAndSave(data)
        } catch (err) {
            console.log('Create Member fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get Members
     */
    public async get(option?: {
        skip: number,
        take: number,
    }, query?: ObjectLiteral) {
        const memberRepo = getCustomRepository(MemberRepo).initQueryBuilder()

        query && Object.keys(query).forEach(key => {
            memberRepo.withFieldCondition(key, query[key])
        })

        const [members, count] = await memberRepo
            .limit(option.take)
            .offset(option.skip)
            .getManyAndCount()
        await MemberHelper.attachIsUserField(members)

        return {
            members,
            count
        }
    }

    /**
     * Get Count Statistic
     */
    public async getCountStatistic() {
        const memberRepo = getCustomRepository(MemberRepo)
        const [totalMemberCount, activeMemberCount] =  await Promise.all([
            memberRepo.count(),
            memberRepo.count({ status: MemberStatus.active }),
        ])
        return {
            total: totalMemberCount,
            active: activeMemberCount,
            inactive: totalMemberCount - activeMemberCount
        }
    }

    /**
     * Update One Member
     * 
     * @param id       Member id
     * @param data  field to update
     */
    public async update(id: string | number, data: any) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)

            const member = await memberRepo.updateById(id, data)
            await MemberHelper.attachIsUserField([member])
            return member
        } catch (err) {
            console.log('Update member fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Delete One Member
     * 
     * @param id    Member id
     */
    public async delete(id: string | number) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)
            const userRepo = getCustomRepository(UserRepo)
            const member = await memberRepo.findOneOrFail(id)
            
            await memberRepo.remove(member)
            await userRepo.removeByIdentity(
                UserIdentityType.member,
                member.id
            )

            return member
        } catch (err) {
            console.log('Delete member fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get Member Base Info 
     * 
     * @param id    Member id
     */
    public async getDetailInfoById(id: string | number) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)
            return await memberRepo
                .initQueryBuilder()
                .withIdCondition(id)
                .withTeamsRelation()
                .withTeamsAsLeaderRelation()
                .withEmergencyContactsRelation()
                .getOne()
        } catch (err) {
            console.log('Find member fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Create a Emergency Contact for a member
     * 
     * @param id        Member id
     * @param data  Fields to update
     */
    public async createEmergencyContact(id: number | string, data: any) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)
            const emergencyContactRepo = getCustomRepository(EmergencyContactRepo)

            const member = await memberRepo.findOneOrFail(id)
            const emergenctContact = emergencyContactRepo.create()

            emergenctContact.member_id = member.id
            emergenctContact.name = data.name
            emergenctContact.relationship = data.relationship
            emergenctContact.phone = data.phone

            return await emergencyContactRepo.save(emergenctContact)
        } catch (err) {
            console.log('Create emergency contact fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get Member's Emergency Contacts
     * 
     * @param id    Member id
     */
    public async getEmergenctContactsById(id: number | string) {
        try {
            const emergencyContactRepo = getCustomRepository(EmergencyContactRepo)
            return await emergencyContactRepo.find({
                member_id: <any>id
            })
        } catch (err) {
            console.log('Find emergency contact fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * 刪除指定緊急聯絡人
     * 
     * @param id    Emergency Contact id
     */
    public async deleteEmergencyContact(id: number | string) {
        try {
            const emergencyContactRepo = getCustomRepository(EmergencyContactRepo)
            const emergenctContact = await emergencyContactRepo.findOneOrFail(id)
            await emergencyContactRepo.remove(emergenctContact)
            return emergenctContact
        } catch (err) {
            console.log('Delete emergency contact fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get members by team
     * 
     * @param id    team id
     */
    public async getMembersByTeam(id: string | number) {
        try {
            const teamRepo = getCustomRepository(TeamRepository)
            const team = await teamRepo.findOneOrFail(id, {
                relations: ['members']
            })
            return team.members
        } catch (err) {
            console.log('Get members by team fail')
            console.log(err.toString())
            return null
        }
    }
}