import mongoose , { Mongoose }from 'mongoose'
import { Connection } from 'typeorm'

import mysqlLoader from '@/loaders/mysql'
import Member from '@/entity/Member'
import MemberService from '@/services/MemberService'
import { 
  correctMemberData, 
  incorrectMemberDatas 
} from './data'

describe('Unit Test: MemberService', () => {
  const memberService = new MemberService()
  let mysqlConnection: Connection

  beforeAll(async () => {
    mysqlConnection = await mysqlLoader()
  })

  afterAll(async () => {
    await mysqlConnection.close()
  })

  afterEach(async () => {
    await Member.clear()
  })

  describe('create() - Create One Member.', () => {
    it('Should create one member success with correct field data', async () => {
      const member = await memberService.create(correctMemberData)
      expect(member).toBeTruthy()
      expect(member).toBeInstanceOf(Member)
    })

    it('Should create member fail with incorrect field datas', async () => {
      const promises: Promise<any>[] = []
      incorrectMemberDatas.forEach(input => {
        promises.push(memberService.create(input))
      })
      await Promise.all(promises).then(members => {
        members.forEach(member => {
          expect(member).toBeNull()
        })
      })
    })
  })

  describe('all() - Get All Members.', () => {
    it('Should be 0 with no members', async () => {
      const members = await memberService.all()
      expect(members.length).toBe(0)
    })

    it('Should return all of the members', async () => {
      let memberCount = 10
      const promises: Promise<any>[] = []
      for (let i = 0; i < memberCount; i++) {
        const member = Object.assign(new Member, correctMemberData)
        promises.push(member.save())
      }
      await Promise.all(promises)
      const members = await memberService.all()
      expect(members.length).toBe(memberCount)
    })
  })

  describe('delete() - Delete The Member', () => {
    let memberId: number
    
    beforeEach(async () => {
      const member = Object.assign(new Member, correctMemberData)
      memberId = (await member.save()).id
    })

    it('Should return member when delete success', async () => {
      const deletedMember = await memberService.delete(memberId)
      const members = await Member.find()
      expect(deletedMember).toBeInstanceOf(Member)
      expect(members.length).toBe(0)
    })

    it('Should return null when the id is not exist in DB', async () => {
      const id = 666
      const deletedMember = await memberService.delete(id)
      const members = await Member.find()
      expect(deletedMember).toBeNull()
      expect(members.length).toBe(1)
    })

    it('Should return null when the id is invalid', async () => {
      const id = 'invalid id'
      const deletedMember = await memberService.delete(id)
      const members = await Member.find()
      expect(deletedMember).toBeNull()
      expect(members.length).toBe(1)
    })
  })
})