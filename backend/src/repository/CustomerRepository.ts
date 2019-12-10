import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import Customer from '@/entity/Customer'

@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer> {
    
    /**
     * Insert one customer
     * 
     * @param data
     */
    public async createAndSave(data: any, filename: string|null = null) {
        const customer = this.create()

        customer.logo = filename
        Object.assign(customer, _.pick(data, [
            'company_name',
            'contact',
            'email',
            'phone',
            'website',
            'address',
            'remark'
        ]))

        return this.save(customer)
    }
}

export default CustomerRepository