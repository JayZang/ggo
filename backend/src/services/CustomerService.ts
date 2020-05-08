import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import { resource } from '@/config'
import CustomerRepo from '@/repository/CustomerRepository'
import storeFileWithRandomName from '@/utils/storeFileWithRandomName'
import IndustryCategoryRepo from '@/repository/IndustryCategoryRepository'

@Service()
export default class CustomerService {

    /**
     * Create one customer
     */
    public  async create(data: any, logo?: Express.Multer.File) {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            const industryCategoryRepo = getCustomRepository(IndustryCategoryRepo)
            
            const filename = logo ?
                await storeFileWithRandomName(logo, resource.customerLogo.dest) :
                null
            const customer = customerRepo.create()

            customerRepo.massAssign(customer, data)
            customer.logo = filename
            customer.industry_categories = data.industry_categories ? 
                await industryCategoryRepo.findByIds(data.industry_categories) :
                [ ]

            return await customerRepo.save(customer)
        } catch (err) {
            console.log('Create Customer fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Update one customer
     */
    public  async update(id: string | number, data: any, logo?: Express.Multer.File) {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            const industryCategoryRepo = getCustomRepository(IndustryCategoryRepo)
            
            const filename = logo ?
                await storeFileWithRandomName(logo, resource.customerLogo.dest) :
                null
            const customer = await customerRepo.findOneOrFail(id)

            customerRepo.massAssign(customer, data)
            filename && (customer.logo = filename)
            customer.industry_categories = data.industry_categories ? 
                await industryCategoryRepo.findByIds(data.industry_categories) :
                [ ]

            return await customerRepo.save(customer)
        } catch (err) {
            console.log('Update Customer fail')
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
            return await customerRepo.find({
                relations: ['industry_categories'],
                order: {
                    'create_at': 'DESC'
                }
            })
        } catch (err) {
            console.log('Get Customer fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Create industry category
     */
    public async createIndustryCategory(name: string) {
        try {
            const industryCategoryRepo = getCustomRepository(IndustryCategoryRepo)
            const industryCategory = industryCategoryRepo.create({ name })
            return await industryCategoryRepo.save(industryCategory)
        } catch (err) {
            console.log('Create industry category fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Update industry category
     */
    public async updateIndustryCategory(id: string | number, name: string) {
        try {
            const industryCategoryRepo = getCustomRepository(IndustryCategoryRepo)
            const industryCategory = await industryCategoryRepo.findOneOrFail(id)
            industryCategory.name = name
            return await industryCategoryRepo.save(industryCategory)
        } catch (err) {
            console.log('Update industry category fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get industry category
     */
    public async getIndustryCategory() {
        try {
            const industryCategoryRepo = getCustomRepository(IndustryCategoryRepo)
            return await industryCategoryRepo
                .initQueryBuilder()
                .withIdOrder('DESC')
                .getMany()
        } catch (err) {
            console.log('Get industry category fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Remove industry category
     */
    public async removeIndustryCategory(id: string | number) {
        try {
            const industryCategoryRepo = getCustomRepository(IndustryCategoryRepo)
            const industryCategory = await industryCategoryRepo.findOneOrFail(id)
            return await industryCategoryRepo.remove(industryCategory)
        } catch (err) {
            console.log('Remove industry category fail')
            console.log(err.toString())
            return null
        }
    }
}