import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import Group from './Group'
import Policy from './Policy'

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    account_id: string

    @Column({
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

    @Column({
        type: 'tinyint'
    })
    identity_type: number

    @Column()
    identity_id: number

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date

    @ManyToMany(type => Group)
    @JoinTable({
        name: 'user_group'
    })
    groups: Group[]

    @ManyToMany(type => Policy)
    @JoinTable({
        name: 'user_policy'
    })
    policies: Policy[]

    total_policies?: Policy[]
}

export enum UserStatus {
    inactive = 0,
    active = 1
}

export enum UserIdentityType {
    admin = 0,
    member = 1,
    customer = 2,
    outsourcing = 3
}