import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import _ from 'lodash'

import MemberRepo from '@/repository/MemberRepository'

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
      const member =  await memberRepo.findOneOrFail(id)      
      return await memberRepo.remove(member)
    } catch (err) {
      console.log('Delete member fail')
      console.log(err.toString())
      return null
    }
  }
}