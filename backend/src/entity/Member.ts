import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'

import EmergencyContact from './EmergencyContact'
import Team from './Team'

@Entity()
export default class Member {

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
        nullable: true,
        select: false
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

    @ManyToMany(type => Team, team => team.members, {
        cascade: true
    })
    teams: Team[]

    @OneToMany(type => Team, team => team.leader, {
        cascade: true
    })
    teams_as_leader: Team[]
}

export enum MemberStatus {
    inactive = 0,
    active = 1
}

export enum MemberGender {
    female = 0,
    male = 1,
    other = 2
}