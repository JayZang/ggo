import { EntityRepository, Repository, getCustomRepository } from 'typeorm'
import _ from 'lodash'

import Task, { TaskStatus } from '@/entity/Task'
import TaskAssignment, { TaskAssignmentType } from '@/entity/TaskAssignment'
import MemberRepo from './MemberRepository'
import TeamRepo from './TeamRepository'

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
    
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
}

export default TaskRepository