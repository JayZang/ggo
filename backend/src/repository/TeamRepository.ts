import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import Team from '@/entity/Team'
import TaskAssignment, { TaskAssignmentType } from '@/entity/TaskAssignment'

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {

    /**
     * Insert one team
     */
    public async createAndSave(data: any, temporary = false) {
        const team = this.create()

        team.name = data.name
        team.description = data.description
        team.leader = data.leader
        team.is_temporary = temporary
        team.status = 1

        return this.save(team)
    }

    /**
     * Get teams
     * 
     * @param isTemporary 
     */
    public async getMany(isTemporary: boolean) {
        return this.createQueryBuilder('team')
            .leftJoinAndMapMany('team.task_assignments', TaskAssignment, 'taskAssignment', 'taskAssignment.target_id = team.id AND taskAssignment.type = :type', { type: TaskAssignmentType.Team })
            .leftJoinAndSelect('team.leader', 'leader')
            .where('is_temporary = :isTemporary', { isTemporary })
            .getMany()
    }
}

export default TeamRepository