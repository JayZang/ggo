import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import Project from './Project'
import TaskAssignment from './TaskAssignment'

@Entity()
export default class Task {

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
        nullable: true
    })
    finish_datetime: Date

    @Column({
        type: 'tinyint'
    })
    status: number

    @Column({
        type: 'text',
        nullable: true
    })
    remark: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date
    
    @Column()
    project_id: number

    @ManyToOne(type => Project, project => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: Project

    @OneToOne(type => TaskAssignment, taskAssignment => taskAssignment.task, {
        cascade: true
    })
    assignment: TaskAssignment
}

export enum TaskStatus {
    Normal = 0,
    Pause = 1,
    Terminated = 2,
    Completed = 3
}