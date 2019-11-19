import { EntityRepository, Repository } from 'typeorm'
import _ from 'lodash'

import Team from '@/entity/Team'

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
        return this.find({ 
            where: {
                is_temporary: isTemporary
            },
            relations: ['leader'] 
        })
    }
}

export default TeamRepository