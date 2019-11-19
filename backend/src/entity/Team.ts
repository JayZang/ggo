import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, ManyToOne, RelationCount, JoinColumn, CreateDateColumn } from 'typeorm'

import Member from './Member'

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

    @Column()
    leader_id: number

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @ManyToOne(type => Member, member => member.teams_as_leader, {
        eager: true,
        nullable: false, 
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'leader_id' },)
    leader: Member

    @ManyToMany(type => Member, member => member.teams)
    @JoinTable({
        name: 'team_member'
    })
    members: Member[]

    @RelationCount((team: Team) => team.members)
    members_count: number
}