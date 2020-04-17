import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import TaskRepo from '@/repository/TaskRepository'
import { TaskStatus } from '@/entity/Task'
import TeamRepository from '@/repository/TeamRepository'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import TaskHelper from '@/helper/TaskHelper'
import Member from '@/entity/Member'
import ProjectRepo from '@/repository/ProjectRepository'

@Service()
export default class TaskService {

    /**
     *  Create a task
     */
    public async create(data: any, creator: Member) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const taskRepo = getCustomRepository(TaskRepo)

            const project = await projectRepo.findOneOrFail(data.project_id, {
                relations: ['managers']
            })

            if (project.finish_datetime) 
                return null
            else if (project.managers.findIndex(manager => manager.id === creator.id) === -1) 
                return null 

            return await taskRepo.createAndSave(data, creator)
        } catch (err) {
            console.log('Create task fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get tasks
     */
    public async get(option?: {
        skip: number,
        take: number,
    }) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const tasks = await taskRepo.find({
                relations: ['project', 'assignment'],
                order: {  create_at: 'DESC' },
                ...option
            })
            return await TaskHelper.attachTasksAssignment(tasks)
        } catch (err) {
            console.log('Get tasks fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get tasks by project id
     * 
     * @param id 
     */
    public async getByProjectId(id: number) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            return await taskRepo.getByProject(id)
        } catch (err) {
            console.log('Get tasks by project id fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Update task status
     * 
     * @param taskId 
     * @param status 
     */
    public async updateStatus(taskId: string | number, status: TaskStatus, operator: Member) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            const task = await taskRepo.findOneOrFail(taskId, {
                relations: ['project', 'project.managers']
            })

            if (task.project.finish_datetime)
                throw new Error('The project that the task belongs to is finished !')
            else if (task.project.managers.findIndex(manager => manager.id === operator.id) === -1) 
                return new Error('Operator(Login User) is not the manager of the project of the task')

            task.status = status
            return await taskRepo.save(task)
        } catch (err) {
            console.log('Update task status fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get total number of tasks
     */
    public async getTotalCount() {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
            return await taskRepo.count()
        } catch (err) {
            console.log('Get total number of tasks fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get tasks by team
     * 
     * @param id    team id
     */
    public async getTasksByTeam(id: string | number, option?: {
        skip: number,
        take: number,
    }) {
        try {
            const teamRepo = getCustomRepository(TeamRepository)
            const taskRepo = getCustomRepository(TaskRepo)
            const team = await teamRepo.findOneOrFail(id)
            const [tasks, count] = await taskRepo.getByAssignment(TaskAssignmentType.Team, team.id, option)
            return {
                tasks,
                count
            }
        } catch (err) {
            console.log('Get tasks by team fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * get one task by id
     */
    public async getOneByTaskId(id: string | number) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
           
            const task = await taskRepo.initQueryBuilder()
                .withIdCondition(id)
                .withAssignmentRelation()
                .withProjectRelation()
                .withWorkReportRelation()
                .withWorkReportOrder('create_at', 'DESC')
                .getOne()

            if (!task) return null

            return (await TaskHelper.attachTasksAssignment([task]))[0]
        } catch (err) {
            console.log('Get one task by id fail')
            console.log(err.toString())
            return null
        }
    }
}