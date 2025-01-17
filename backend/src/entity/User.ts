import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import Group from './Group'
import Policy, { Permissions } from './Policy'
import Member from './Member'

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    account_id: string

    @Column({
        select: false
    })
    password: string

    @Column({
        default: true
    })
    loginable: boolean

    @Column({
        type: 'tinyint'
    })
    identity_type: number

    @Column()
    identity_id: number

    @Column({
        nullable: true
    })
    line_user_id: string | null

    @Column({
        nullable: true
    })
    line_nonce: string | null

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date

    @Column({ 
        type: 'datetime',
        nullable: true
    })
    last_login_datetime: Date

    @ManyToMany(type => Group,{
        cascade: true
    })
    @JoinTable({
        name: 'user_group'
    })
    groups: Group[]

    @ManyToMany(type => Policy, {
        cascade: true
    })
    @JoinTable({
        name: 'user_policy'
    })
    policies: Policy[]

    identity?: Member

    total_policies?: Policy[]

    permissions?: Permissions
}

export enum UserIdentityType {
    admin = 0,
    manager = 1,
    member = 2,
    customer = 3,
    outsourcing = 4
}