import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import Customer from './Customer'

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
        nullable: true
    })
    finish_datetime: Date

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

    @ManyToOne(type => Customer, customer => customer.projects, {
        eager: true
    })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer
}

export enum ProjectSrcType {
    Internal = 0,
    Customer = 1
}