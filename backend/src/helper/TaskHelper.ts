import { getCustomRepository } from "typeorm"

import { TaskAssignmentType } from "@/entity/TaskAssignment"
import MemberRepo from "@/repository/MemberRepository"
import TeamRepo from "@/repository/TeamRepository"
import Task from "@/entity/Task"

export class TaskHelper {

    static async isTaskAvailableByMember(task: Task, memberId: number) {
        const teamRepo = getCustomRepository(TeamRepo)

        if (task.assignment.type === TaskAssignmentType.Member)
            return task.assignment.target_id === memberId
        else if (task.assignment.type === TaskAssignmentType.Team) {
            const teams = await teamRepo.getByMember(memberId)
            return teams.map(team => team.id).includes(task.assignment.target_id)
        }

        return false
    }

    static async attachTasksAssignment(tasks: Task[]) {
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

export default TaskHelper