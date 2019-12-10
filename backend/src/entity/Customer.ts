import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export default class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 50
    })
    company_name: string

    @Column({
        type: 'text',
        nullable: true
    })
    logo: string

    @Column({
        type: 'varchar',
        length: 50
    })
    contact: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    email: string

    @Column({
        type: 'varchar',
        length: 30
    })
    phone: string

    @Column({
        type: 'text',
        nullable: true
    })
    website: string

    @Column({
        nullable: true
    })
    address: string

    @Column({
        type: 'text',
        nullable: true
    })
    remark: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date
}