import { EntityRepository, Repository } from 'typeorm'

import Team from '@/entity/Team'

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {
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