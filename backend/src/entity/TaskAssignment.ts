import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import Task from './Task'
import Member from './Member'
import Team from './Team'

@Entity()
export default class TaskAssignment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    task_id: number

    @Column()
    target_id: number

    @Column()
    distributor_id: number

    @Column({
        type: 'tinyint'
    })
    type: number

    @OneToOne(type => Task, task => task.assignment,{
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'task_id' })
    task: Task

    @ManyToOne(type => Member)
    @JoinColumn({ name: 'distributor_id' })
    distributor: Member

    target: Member | Team
}

export enum TaskAssignmentType {
    Member = 0,
    Team = 1,
    Outsourcing = 2
}