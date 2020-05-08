import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

import Member from './Member'
import Customer from './Customer'

@Entity()
export default class IndustryCategory {

  @PrimaryGeneratedColumn()
  id: number 

  @Column()
  name: string

  @ManyToMany(type => Customer, customer => customer.industryCategories)
  @JoinTable({
    name: 'customer_industry_category'
})
  customers: Customer[]
}