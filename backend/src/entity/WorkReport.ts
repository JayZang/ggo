import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, ManyToOne, RelationCount, JoinColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm'

import Member from './Member'
import Task from './Task'

@Entity()
export default class WorkReport {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255
    })
    title: string

    @Column({
        type: 'longtext'
    })
    content: string

    @ManyToOne(type => Member, member => member.workReports)
    @JoinColumn({ name: 'submitter_id' })
    submitter: Member

    @Column()
    submitter_id: number

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @ManyToOne(type => Task, task => task.workReports)
    @JoinColumn({ name: 'task_id' })
    task: Task

    @Column()
    task_id: number

    @Column({
        type: 'varchar',
        length: 100
    })
    spend_time: string

    @Column({
        type: 'tinyint'
    })
    submit_from: WorkReportSubmitFrom
}

export enum WorkReportSubmitFrom {
    Web = 0,
    Line = 1
}