import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'

@Entity()
export default class Policy {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    variable_name: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date
}