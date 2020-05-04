import { getCustomRepository } from 'typeorm'
import moment from 'moment'
import { Service } from 'typedi'
import _ from 'lodash'

import Member from '@/entity/Member'
import ProjectRepo from '@/repository/ProjectRepository'
import TaskHelper from '@/helper/TaskHelper'
import { TaskStatus } from '@/entity/Task'
import TaskRepo from '@/repository/TaskRepository'
import TaskAssignment from '@/entity/TaskAssignment'

@Service()
export default class UserProjectService {

    /**
     * Get user projects
     */
    public async get(member: Member, option: {
        take: number
        skip: number
    }) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)

            return await projectRepo.initQueryBuilder()
                .withManagerCondition(member.id)
                .withCustomerRelation()
                .limit(option.take)
                .offset(option.skip)
                .getMany()
        } catch (err) {
            console.log(' Get user projects error')
            console.log(err)
            return null
        }
    }

    /**
     * Get user project simple statistic
     */
    public async getSimpleStatistic(member: Member) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)

            const [
                countOfTotal,
                countOfFinished
            ] = await Promise.all([
                projectRepo.initQueryBuilder()
                    .withManagerCondition(member.id)
                    .getCount(),
                projectRepo.initQueryBuilder()
                    .withManagerCondition(member.id)
                    .withFinishedCondition(true)
                    .getCount()
            ])

            return {
                countOfTotal,
                countOfFinished,
                countOfProcessing: countOfTotal - countOfFinished
            }
        } catch (err) {
            console.log(' Get user project simple statistic error')
            console.log(err)
            return null
        }
    }

    /**
     * Get user project detail info
     */
    public async getDetail(id: number | string, member: Member) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)

            const project = await projectRepo.findOneOrFail(id, {
                relations: [
                    'managers',
                    'customer',
                    'member_participants',
                    'team_participants',
                    'tasks',
                    'tasks.assignment'
                ]
            })

            // member has to be in the managers of the project
            if (project.managers.findIndex(manager => manager.id === member.id) === -1)
                return null

            await TaskHelper.attachTasksAssignment(project.tasks)

            return project
        } catch (err) {
            console.log(' Get user project detail info error')
            console.log(err)
            return null
        }
    }

    /**
     * Finish the project
     */
    public async finish(id: string | number, date: string,  operator: Member) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const project = await projectRepo.findOneOrFail(id, {
                relations: ['tasks', 'managers']
            })

            // operator has to be in the managers of the project
            if (project.managers.findIndex(manager => manager.id === operator.id) === -1)
                return null
            else if (project.finish_datetime)
                throw new Error('The project has been set finish date !')
            else if (moment(date).isBefore(project.start_datetime))
                throw new Error('Finish date can not before project start date !')

            const tasks = project.tasks
            const isAllCompletedOrTerminated = !!tasks.length && tasks.reduce((status, task) => {
                return status && (task.status === TaskStatus.Completed || task.status === TaskStatus.Terminated)
            }, true)

            if (!isAllCompletedOrTerminated)
                throw new Error('Not all tasks are completed or terminated !')

            project.finish_datetime = date

            return projectRepo.save(project)
        } catch (err) {
            console.log('Finish Projects fail')
            console.log(err.toString())
            return null
        }
    }

        /**
     *  Create a task
     */
    public async createTask(id: number | string, data: any, creator: Member) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const taskRepo = getCustomRepository(TaskRepo)

            const project = await projectRepo.findOneOrFail(id, {
                relations: ['managers']
            })

            if (project.finish_datetime) 
                return null
            else if (project.managers.findIndex(manager => manager.id === creator.id) === -1) 
                return null

            const task = taskRepo.create()
            taskRepo.assignValue(task, data)
            task.project = project
            task.status = TaskStatus.Normal
            task.assignment = new TaskAssignment
            task.assignment.type = parseInt(data.assign_type)
            task.assignment.target_id = data.assign_id
            task.assignment.distributor = creator

            return await taskRepo.save(task)
                .then(task => TaskHelper.attachTasksAssignment([task]))
                .then(tasks => tasks[0])
        } catch (err) {
            console.log('Create task fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Update task status
     */
    public async updateTaskStatus(taskId: string | number, status: TaskStatus, operator: Member) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const task = await taskRepo.findOneOrFail(taskId, {
                relations: ['project', 'project.managers']
            })

            if (task.project.managers.findIndex(manager => manager.id === operator.id) === -1) 
                throw new Error('Operator(Login User) is not the manager of the project of the task')
            if (task.project.finish_datetime)
                throw new Error('The project that the task belongs to is finished !')

            task.status = status
            if (status === TaskStatus.Completed)
                task.finish_datetime = moment().toDate()
            else
                task.finish_datetime = null

            return await taskRepo.save(task)
        } catch (err) {
            console.log('Update task status fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get project task
     */
    public async getTask(taskId: string | number, member: Member) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const projectRepo = getCustomRepository(ProjectRepo)

            const task = await taskRepo
                .initQueryBuilder()
                .withIdCondition(taskId)
                .withAssignmentRelation()
                .withWorkReportRelation()
                .withWorkReportOrder('create_at', 'DESC')
                .getOne()
                
            if (!task) return null

            const project = await projectRepo.findOneOrFail(task.project_id, {
                relations: ['managers']
            })

            if (project.managers.findIndex(manager => manager.id === member.id) === -1) 
                throw new Error('Operator(Login User) is not the manager of the project of the task')

            return (await TaskHelper.attachTasksAssignment([task]))[0]
        } catch (err) {
            console.log('Get project task fail')
            console.log(err.toString())
            return null
        }
    }
}