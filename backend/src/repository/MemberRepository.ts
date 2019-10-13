import { EntityRepository, Repository, getCustomRepository } from 'typeorm'
import _ from 'lodash'

import Member from '@/entity/Member'
import { MemberStatus } from '@/contract/model/IMember'

@EntityRepository(Member)
class MemberRepository extends Repository<Member> {

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
}

export default MemberRepository