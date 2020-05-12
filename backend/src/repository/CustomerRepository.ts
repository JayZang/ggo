import { EntityRepository, ObjectLiteral } from 'typeorm'
import _ from 'lodash'

import Customer from '@/entity/Customer'
import { BaseRepository } from './BaseRepocitory'

@EntityRepository(Customer)
class CustomerRepository extends BaseRepository<Customer> {
    protected industryCategoriesAlias = 'industryCategories'
    protected projectsAlias = 'projects'

    massAssign(customer: Customer, data: ObjectLiteral) {
        customer.company_name = data.company_name
        customer.contact = data.contact
        customer.phone = data.phone
        customer.email = data.email || null
        customer.website = data.website || null
        customer.address = data.address || null
        customer.remark = data.remark || null
    }

    withIndustryCategoryRelation() {
        this.queryBuilder.leftJoinAndSelect(
            `${this.entityAlias}.industry_categories`,
            this.industryCategoriesAlias,
        )
        return this
    }

    withProjectsRelation(order: 'DESC' | 'ASC' = 'DESC') {
        this.queryBuilder.leftJoinAndSelect(
            `${this.entityAlias}.projects`,
            this.projectsAlias
        )
        this.queryBuilder.orderBy(
            `${this.projectsAlias}.id`,
            order
        )
        return this
    }
}

export default CustomerRepository