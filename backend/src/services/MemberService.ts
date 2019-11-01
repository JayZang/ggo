import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import _ from 'lodash'

import MemberRepo from '@/repository/MemberRepository'
import EmergencyContactRepo from '@/repository/EmergencyContactRepository'

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
     * Get All Members
     */
    public async all() {
        const memberRepo = getCustomRepository(MemberRepo)
        return memberRepo.find()
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
            return await memberRepo.updateById(id, data)
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
            const member = await memberRepo.findOneOrFail(id)
            return await memberRepo.remove(member)
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
    public async getBaseInfoById(id: string | number) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)
            return await memberRepo.findOneOrFail(id)
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
}