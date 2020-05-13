import { Service } from 'typedi'
import moment from 'moment'
import { getCustomRepository } from 'typeorm'

import { resource } from '@/config'
import CustomerRepo from '@/repository/CustomerRepository'
import storeFileWithRandomName from '@/utils/storeFileWithRandomName'
import IndustryCategoryRepo from '@/repository/IndustryCategoryRepository'
import ProjectService from './ProjectService'

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
     * Get a customer
     */
    public async getDetail(id: string | number) {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            const customer = await customerRepo
                .initQueryBuilder()
                .withIdCondition(id)
                .withIndustryCategoryRelation()
                .withProjectsRelation()
                .getOne()

            if (!customer)
                return null

            let projectCompletedCount = 0
            const now = moment()
            const projectTotalCount = customer.projects.length
            const projectCurrentYearCount = customer.projects.filter(project => {
                return moment(project.create_at).year() === now.year()
            }).length
            const projectAvgSpendTime = projectTotalCount && customer.projects.reduce((prevSpendTime, project) => {
                if (!project.finish_datetime)
                    return prevSpendTime
                projectCompletedCount++
                return prevSpendTime + moment(project.finish_datetime).diff(project.start_datetime)
            }, 0) / projectCompletedCount
            const projectsOfReview = customer.projects.filter(project => {
                const createAt = moment(project.create_at)
                if (createAt.year() === now.year())
                    return false
                const monthDiff = Math.abs(createAt.month() - now.month())
                return monthDiff <= 3 || monthDiff >= 9
            })

            return {
                customer,
                projectTotalCount,
                projectCurrentYearCount,
                projectAvgSpendTime,
                projectsOfReview
            }
        } catch (err) {
            console.log('Get a customer fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Remove customer
     */
    public async remove(id: string | number) {
        try {
            const customerRepo = getCustomRepository(CustomerRepo)
            const customer = await customerRepo.findOneOrFail(id)
            return await customerRepo.remove(customer)
        } catch (err) {
            console.log('Remove Customer fail')
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