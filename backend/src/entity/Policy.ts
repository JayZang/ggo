import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export default class Policy {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @Column()
    variable_name: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date
}

export type Permissions = Record<PermissionsList, undefined | boolean>

export type PermissionsList =
    'member_management' |
    'team_management' |
    'customer_management' |
    'project_management' |
    'task_management'