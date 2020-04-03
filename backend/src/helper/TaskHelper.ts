import { getCustomRepository } from "typeorm"

import { TaskAssignmentType } from "@/entity/TaskAssignment"
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
}

export default TaskHelper