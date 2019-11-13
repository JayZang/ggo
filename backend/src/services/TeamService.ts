import { Service } from 'typedi'

import TeamRepo from '@/repository/TeamRepository'
import { getCustomRepository } from 'typeorm'

@Service()
export default class TeamService {

    /**
     * Get permanent teams
     */
    public async getPermanentTeams() {
        const teamRepo = getCustomRepository(TeamRepo)
        return await teamRepo.getMany(false)
    }

    public async getTemporaryTeams() {
        const teamRepo = getCustomRepository(TeamRepo)
        return await teamRepo.getMany(true)
    }
}