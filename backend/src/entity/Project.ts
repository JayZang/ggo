import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import Customer from './Customer'
import Task from './Task'
import Member from './Member'
import Team from './Team'

@Entity()
export default class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @Column()
    start_datetime: Date

    @Column()
    deadline_datetime: Date

    @Column({
        type: 'datetime',
        nullable: true
    })
    finish_datetime: Date | string

    @Column({
        nullable: true
    })
    quote: number

    @Column({
        type: 'tinyint'
    })
    source_type: number

    @Column({
        nullable: true
    })
    customer_id: number

    @Column({
        type: 'text',
        nullable: true
    })
    remark: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @ManyToOne(type => Customer, customer => customer.projects)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @OneToMany(type => Task, task => task.project)
    tasks: Task[]

    @ManyToMany(type => Member, member => member.projects_as_manager)
    @JoinTable({
        name: 'project_manager'
    })
    managers: Member[]

    @ManyToMany(type => Team, team => team.projects)
    @JoinTable({
        name: 'project_team_participant'
    })
    team_participants: Team[]

    @ManyToMany(type => Member, member => member.projects_as_member_participant)
    @JoinTable({
        name: 'project_member_participant'
    })
    member_participants: Member[]
}

export enum ProjectSrcType {
    Internal = 0,
    Customer = 1
}