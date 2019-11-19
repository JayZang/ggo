import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

import Member from './Member'

@Entity()
export default class EmergencyContact {

  @PrimaryGeneratedColumn()
  id: number 

  @Column()
  member_id: number 

  @Column()
  name: string

  @Column()
  relationship: string

  @Column()
  phone: string

  @ManyToOne(type => Member, member => member.emergencyContacts, {
    nullable: false,  
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'member_id' })
  member: Member
}