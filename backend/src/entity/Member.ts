import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,  OneToMany} from 'typeorm'

import EmergencyContact from './EmergencyContact'

@Entity()
export default class Member extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  gender: boolean

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

  @Column()
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

  @OneToMany(type => EmergencyContact, emergencyContact => emergencyContact.member, {
    cascade: true
  })
  emergencyContacts: EmergencyContact[]
}