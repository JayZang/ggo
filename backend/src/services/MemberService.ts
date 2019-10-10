import { Service } from 'typedi'

import Member from '@/entity/Member'
import { MemberStatus } from '@/contract/model/IMember'

@Service()
export default class MemberService {
  /**
   * Create One Member
   */
  public async create(data: any) {
    try {
      const member = new Member()

      Object.assign(member, data)
      member.status = MemberStatus.active

      return await member.save()
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
    return Member.find()
  }

  /**
   * Update One Member
   * 
   * @param id    Member ObjectId
   * @param data  field to update
   */
  public async update(id: string | number, data: any) {
    try {
      let member = await Member.findOneOrFail(id)

      Object.assign(member, data)
      
      return await member.save()
    } catch (err) {
      console.log('Update member fail')
      console.log(err.toString())
      return null
    }
  }

  /**
   * Delete One Member
   * 
   * @param id    Member ObjectId
   */
  public async delete(id: string | number) {
    try {
      const member =  await Member.findOneOrFail(id)

      await member.remove()
      
      return member
    } catch (err) {
      console.log('Delete member fail')
      console.log(err.toString())
      return null
    }
  }
}