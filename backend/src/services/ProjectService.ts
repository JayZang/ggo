import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import ProjectRepo from '@/repository/ProjectRepository'
import CustomerRepo from '@/repository/CustomerRepository'
import { ProjectSrcType } from '@/entity/Project'
import Customer from '@/entity/Customer'
import { regularizeCustomerData } from '@/utils/data-regularizer/customer'
import moment = require('moment')
import task from '@/api/routes/task'
import { TaskStatus } from '@/entity/Task'

@Service()
export default class ProjectService {

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
     * Update one project
     */
    public  async update(id: string, data: any) {
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

            return await projectRepo.updateById(id, {
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
    public async get(option?: {
        skip: number,
        take: number,
    }) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.find({
                relations: ['customer'],
                order: {  id: 'DESC' },
                ...option
            }).then(projects => {
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

    /**
     * Get project by id
     * 
     * @param id 
     */
    public async getById(id: string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.findOne(id, {
                relations: ['customer']
            }).then(project => {
                project.customer = project.customer && regularizeCustomerData(project.customer)
                return project
            })
        } catch (err) {
            console.log('Get Projects by id fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Get project total count
     */
    public async getTotalCount() {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.count()
        } catch (err) {
            console.log('Get Projects total count fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Get project count by source type
     */
    public async getCountBySrcType(type: ProjectSrcType) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.count({
                source_type: type
            })
        } catch (err) {
            console.log('Get Projects count by source type fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Finish the project
     * 
     * @param id 
     * @param date 
     */
    public async finish(id: string | number, date: string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const project = await projectRepo.findOneOrFail(id)

            if (project.finish_datetime)
                throw new Error('The project has been set finish date !')
            else if (moment(date).isBefore(project.start_datetime))
                throw new Error('Finish date can not before project start date !')

            const tasks = await project.tasks
            const isAllCompletedOrTerminated = tasks.reduce((status, task) => {
                return status && (task.status === TaskStatus.Completed || task.status === TaskStatus.Terminated)
            }, true)

            if (!isAllCompletedOrTerminated)
                throw new Error('Not all tasks are completed or terminated !')

            project.finish_datetime = date

            return projectRepo.save(project)
        } catch (err) {
            console.log('Finish Projects fail')
            console.log(err.toString())
            return 0
        }
    }
}