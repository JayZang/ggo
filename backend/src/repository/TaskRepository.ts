import { EntityRepository, Repository, getCustomRepository, In } from 'typeorm'
import _ from 'lodash'

import Task, { TaskStatus } from '@/entity/Task'
import TaskAssignment, { TaskAssignmentType } from '@/entity/TaskAssignment'
import MemberRepo from './MemberRepository'
import TeamRepo from './TeamRepository'
import Project from '@/entity/Project'
import { BaseRepository } from './BaseRepocitory'
import WorkReport from '@/entity/WorkReport'

@EntityRepository(Task)
class TaskRepository extends BaseRepository<Task> {
    projectAlias = 'project'
    assignmentAlias = 'taskAssignment'
    workReportsAlias = 'workReports'

    /**
     * Insert one Project
     *  
     * @param data
     */
    public async createAndSave(data: any) {
        const memberRepo = getCustomRepository(MemberRepo)
        const task = this.create()

        this.assignValue(task, data)
        task.status = TaskStatus.Normal
        task.assignment = new TaskAssignment
        task.assignment.type = parseInt(data.assign_type)
        task.assignment.target_id = data.assign_id
        task.assignment.distributor = await memberRepo.findOne(1)

        return this.save(task)
            .then(task => this.attachTasksAssignment([task]))
            .then(tasks => tasks[0])
    }

    public async getByProject(projectId: number) {
        return this.find({
            relations: ['assignment'],
            where: {
                project_id: projectId
            },
            order: {
                create_at: 'DESC'
            }
        }).then(this.attachTasksAssignment)
    }

    public assignValue(task: Task, data: any) {
        Object.assign(task, _.pick(data, [
            'name',
            'description',
            'start_datetime',
            'deadline_datetime',
            'project_id',
            'remark',
        ]))
    }

    public async getByAssignment(type: TaskAssignmentType, targetId: string | number, option: {
        skip: number,
        take: number,
    } = {skip: 0, take: 10}) {
        return this.createQueryBuilder('task')
            .innerJoinAndMapOne(
                'task.assignment', 
                TaskAssignment, 
                'taskAssignment', 
                'task.id = taskAssignment.task_id AND taskAssignment.type = :type AND taskAssignment.target_id = :targetId', 
                { type, targetId })
            .leftJoinAndMapOne('task.project', Project, 'project', 'task.project_id = project.id')
            .limit(option.take)
            .offset(option.skip)
            .getManyAndCount() 
    }

    public async attachTasksAssignment(tasks: Task[]) {
        const memberRepo = getCustomRepository(MemberRepo)
        const teamRepo = getCustomRepository(TeamRepo)
        const memberIds: number[][] = []
        const teamIds: number[][] = []
        const outsourcingIds: number[][] = []

        tasks.forEach((task, index) => {
            if (!task.assignment) return

            let targetIds = undefined
            const targetId = task.assignment.target_id

            switch (task.assignment.type) {
                case TaskAssignmentType.Member:
                    targetIds = memberIds
                    break
                
                case TaskAssignmentType.Team:
                    targetIds = teamIds
                    break
                
                case TaskAssignmentType.Outsourcing:
                    targetIds = outsourcingIds
                    break

                default:
                    return
            }

            targetIds[targetId] || (targetIds[targetId] = [])
            targetIds[targetId].push(index)
        })

        const [
            members,
            teams
        ] = await Promise.all([
            memberRepo.findByIds(Object.keys(memberIds)),
            teamRepo.findByIds(Object.keys(teamIds))
        ])

        members.forEach(member => {
            memberIds[member.id].forEach(index => {
                tasks[index].assignment.target = member
            })
        })

        teams.forEach(team => {
            teamIds[team.id].forEach(index => {
                tasks[index].assignment.target = team
            })
        })

        return tasks
    }

    public withAssignmentRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.assignment`, this.assignmentAlias)
        return this
    }

    public withProjectRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.project`, this.projectAlias)
        return this
    }

    public withWorkReportRelation(withSubmitterRelation = true) {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.workReports`, this.workReportsAlias)
        if (withSubmitterRelation)
            this.queryBuilder.leftJoinAndSelect(`${this.workReportsAlias}.submitter`, 'workReportSubmitter')
        return this
    }

    public withStatusCondition(status: TaskStatus[]) {
        this.queryBuilder.andWhere('status IN (:status)', { status })
        return this
    }

    public withAssignmentCondition(_assigments: {
        type: TaskAssignmentType, 
        targetIds: string[] | number[]
    }[]) {
        const assigments = _assigments.filter(assignment => assignment.targetIds.length !== 0)

        if (assigments.length === 0)
            return this

        this.queryBuilder.innerJoinAndSelect(
            `${this.entityAlias}.assignment`,
            this.assignmentAlias,
            assigments.map((assigment, index) => {
                return `(${this.assignmentAlias}.type = :type${index} AND ${this.assignmentAlias}.target_id IN (:targetIds${index}))`
            }).join(' OR '),
            {
                ...assigments.reduce((obj, assigment, index) => ({
                    ...obj,
                    [`type${index}`]: assigment.type,
                    [`targetIds${index}`]: assigment.targetIds
                }), {})
            }
        )
        return this
    }

    public withWorkReportOrder(
        field: keyof WorkReport = 'create_at', 
        order: 'DESC' | 'ASC' = 'DESC'
    ) {
        this.queryBuilder.orderBy(`${this.workReportsAlias}.${field}`, order)
        return this
    }
}

export default TaskRepository