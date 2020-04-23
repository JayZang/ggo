import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import { resource } from '@/config'
import CustomerRepo from '@/repository/CustomerRepository'
import storeFileWithRandomName from '@/utils/storeFileWithRandomName'

@Service()
export default class CustomerService {

    /**
     * Create one customer
     */
    public  async create(data: any, logo?: Express.Multer.File) {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            const filename = logo ?
                await storeFileWithRandomName(logo, resource.customerLogo.dest) :
                null

            return await customerRepo.createAndSave(data, filename)
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
        } catch (err) {
            console.log('Get Customer fail')
            console.log(err.toString())
            return null
        }
    }
}