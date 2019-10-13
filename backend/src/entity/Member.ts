import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,  OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import EmergencyContact from './EmergencyContact'

@Entity()
export default class Member  {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'tinyint',
    width: 4
  })
  gender: number

  @Column({
    nullable: true
  })
  avatar: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  birthday: Date

  @Column()
  take_office_date: Date

  @Column({
    nullable: true
  })
  leave_office_date: Date

  @Column({
    nullable: true
  })
  password: string

  @Column({
    nullable: true
  })
  line_id: string

  @Column({
    type: 'tinyint',
    width: 4
  })
  status: number

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date

  @OneToMany(type => EmergencyContact, emergencyContact => emergencyContact.member, {
    cascade: true
  })
  emergencyContacts: EmergencyContact[]
}