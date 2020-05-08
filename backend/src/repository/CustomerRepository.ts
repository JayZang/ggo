import { EntityRepository, ObjectLiteral } from 'typeorm'
import _ from 'lodash'

import Customer from '@/entity/Customer'
import { BaseRepository } from './BaseRepocitory'

@EntityRepository(Customer)
class CustomerRepository extends BaseRepository<Customer> {

    massAssign(customer: Customer, data: ObjectLiteral) {
        Object.assign(customer, _.pick(data, [
            'company_name',
            'contact',
            'email',
            'phone',
            'website',
            'address',
            'remark'
        ]))
    }
}

export default CustomerRepository