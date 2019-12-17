import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import ProjectRepo from '@/repository/ProjectRepository'
import CustomerRepo from '@/repository/CustomerRepository'
import { ProjectSrcType } from '@/entity/Project'
import Customer from '@/entity/Customer'
import { regularizeCustomerData } from '@/utils/data-regularizer/customer'

@Service()
export default class CustomerService {

    /**
     * Create one project
     */
    public  async create(data: any) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const customerRepo = getCustomRepository(CustomerRepo)
            let customer: Customer | null = null

            if (data.source_type == ProjectSrcType.Customer) {
                customer = await customerRepo.findOne(data.customer_id)
                if (!customer)
                    throw new Error(`None customer with id ${data.customer_id}`)
                customer = regularizeCustomerData(customer)
            }

            return await projectRepo.createAndSave({
                ...data, 
                customer
            })
        } catch (err) {
            console.log('Create Project fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get projects
     */
    public async get() {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.find().then(projects => {
                return projects.map(project => {
                    project.customer = project.customer && regularizeCustomerData(project.customer)
                    return project
                })
            })
        } catch (err) {
            console.log('Get Projects fail')
            console.log(err.toString())
            return null
        }
    }
}