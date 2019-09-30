import { Types } from 'mongoose'
import { Service } from 'typedi'

import Member from '@/models/member'
import { MemberStatus } from '@/interfaces/model/IMember'

@Service()
export default class MemberService {
  /**
   * Create One Member
   */
  public async create(data: any) {
    try {
      const member = new Member()

      member.massAssign(data)
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
  public async update(id: Types.ObjectId | String, data: any) {
    try {
      let member = await Member.findById(id)

      if (!member)
        throw new Error('Member Not Found')

      member.massAssign(data)
      
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
  public async delete(id: Types.ObjectId | String) {
    try {
      return await Member.findByIdAndDelete(id)
    } catch (err) {
      console.log('Delete member fail')
      console.log(err.toString())
      return null
    }
  }
}