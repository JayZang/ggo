import { Service } from 'typedi'
import { getCustomRepository, ObjectLiteral } from 'typeorm'

import TaskHelper from '@/helper/TaskHelper'
import TaskRepo from '@/repository/TaskRepository'
import TeamRepository from '@/repository/TeamRepository'
import { TaskAssignmentType } from '@/entity/TaskAssignment'

@Service()
export default class TaskService {

    /**
     * Get tasks
     */
    public async get(option?: {
        skip: number,
        take: number,
    }, query?: ObjectLiteral) {
        try {
            const taskRepo = getCustomRepository(TaskRepo)
                .initQueryBuilder()
                .withProjectRelation()
                .withAssignmentRelation()
                .withCreateAtOrder('DESC')
                .skip(option.skip)
                .take(option.take)

            query && this.setQueryConfig(taskRepo, query)

            return await taskRepo.getMany()
                .then(tasks => TaskHelper.attachTasksAssignment(tasks))
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
    public async getTotalCount(query?: ObjectLiteral) {
        try {
            const taskRepo = getCustomRepository(TaskRepo).initQueryBuilder()

            query && this.setQueryConfig(taskRepo, query)

            return await taskRepo.getCount()
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

    private setQueryConfig(repo: TaskRepo, query: ObjectLiteral) {
        Object.keys(query).forEach(key => {
            if (['name'].includes(key))
                repo.withFieldLikeCondition(key, query[key])
            else if ([].includes(key))
                repo.withFieldCondition(key, query[key])
        })
    }
}