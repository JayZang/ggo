import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToOne } from 'typeorm'

import EmergencyContact from './EmergencyContact'
import Team from './Team'
import User from './User'
import WorkReport from './WorkReport'

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

    @OneToMany(type => WorkReport, workReport => workReport.submitter, {
        cascade: true
    })
    workReports: WorkReport[]

    isUser?: boolean
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