import { EntityRepository } from 'typeorm'
import _ from 'lodash'

import Project from '@/entity/Project'
import Task, { TaskStatus } from '@/entity/Task'
import TaskAssignment, { TaskAssignmentType } from '@/entity/TaskAssignment'
import { BaseRepository } from './BaseRepository'
import WorkReport from '@/entity/WorkReport'
import TaskHelper from '@/helper/TaskHelper'
import Member from '@/entity/Member'

@EntityRepository(Task)
class TaskRepository extends BaseRepository<Task> {
    projectAlias = 'project'
    assignmentAlias = 'taskAssignment'
    workReportsAlias = 'workReports'

    public async getByProject(projectId: number) {
        return this.find({
            relations: ['assignment'],
            where: {
                project_id: projectId
            },
            order: {
                create_at: 'DESC'
            }
        }).then(TaskHelper.attachTasksAssignment)
    }

    public assignValue(task: Task, data: any) {
        task.name = data.name
        task.description = data.description || null
        task.start_datetime = data.start_datetime
        task.deadline_datetime = data.deadline_datetime
        task.remark = data.remark || null
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
            .take(option.take)
            .skip(option.skip)
            .getManyAndCount() 
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