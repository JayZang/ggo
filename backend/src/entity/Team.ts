import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, RelationCount, JoinColumn, CreateDateColumn, OneToMany, RelationId } from 'typeorm'

import Member from './Member'
import TaskAssignment from './TaskAssignment'
import Project from './Project'

@Entity()
export default class Team {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string

    @Column({
        type: 'text'
    })
    description: string

    @Column()
    is_temporary: boolean

    @Column({
        type: 'tinyint',
        width: 4
    })
    status: number

    
    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date
    
    @ManyToOne(type => Member, member => member.teams_as_leader, {
        nullable: false
    })
    @JoinColumn({
        name: 'leader_id'
    })
    leader: Member

    @RelationId((team: Team) => team.leader)
    leader_id: number
    
    @ManyToMany(type => Member, member => member.teams)
    @JoinTable({
        name: 'team_member'
    })
    members: Member[]

    @RelationCount((team: Team) => team.members)
    members_count: number

    @ManyToMany(type => Project, project => project.team_participants)
    projects: Project[]

    task_assignments: TaskAssignment[]
}