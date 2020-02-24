import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import Policy from './Policy'
import User from './User'

@Entity()
export default class Group {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @ManyToMany(type => Policy)
    @JoinTable({
        name: 'group_policy'
    })
    policies: Policy[]

    @ManyToMany(type => User, user => user.groups)
    users: User[]
}