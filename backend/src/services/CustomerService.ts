import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import { promises as fs } from 'fs'
import moment from 'moment'
import crypto from 'crypto'

import CustomerRepo from '@/repository/CustomerRepository'
import { resource } from '@/config'
import { regularizeCustomerData } from '@/utils/data-regularizer/customer'

@Service()
export default class CustomerService {

    /**
     * Create one customer
     */
    public  async create(data: any, logo?: Express.Multer.File) {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            let filename = null

            logo && await fs.mkdir(resource.customerLogo.dest, {
                recursive: true
            }).then(() => {
                filename = crypto.createHash('sha256').update(`${logo.originalname}${moment.now()}`).digest('hex')
                return fs.writeFile(`${resource.customerLogo.dest}${filename}`, logo.buffer)
            })

            return await customerRepo.createAndSave(data, filename)
                .then(customer => regularizeCustomerData(customer))
        } catch (err) {
            console.log('Create Customer fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get customers
     */
    public async get() {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            return await customerRepo.find()
                .then(customers => customers.map(customer => regularizeCustomerData(customer)))
        } catch (err) {
            console.log('Get Customer fail')
            console.log(err.toString())
            return null
        }
    }
}