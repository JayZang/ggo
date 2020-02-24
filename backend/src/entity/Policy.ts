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