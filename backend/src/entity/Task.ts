import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import Project from './Project'

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
        type: 'text'
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

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date
    
    @Column()
    project_id: number

    @ManyToOne(type => Project, project => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: Project
}