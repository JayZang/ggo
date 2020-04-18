import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import Member from '@/entity/Member'
import { TaskStatus } from '@/entity/Task'
import { TaskAssignmentType } from '@/entity/TaskAssignment'
import TaskRepo from '@/repository/TaskRepository'
import TeamRepository from '@/repository/TeamRepository'
import TaskHelper from '@/helper/TaskHelper'

@Service()
export default class TaskService {

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
     * Get one task by id
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