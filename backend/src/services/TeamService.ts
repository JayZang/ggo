import { Service } from 'typedi'

import TeamRepo from '@/repository/TeamRepository'
import { getCustomRepository } from 'typeorm'
import MemberRepository from '@/repository/MemberRepository'

@Service()
export default class TeamService {

    /**
     * Create one team
     */
    public async create(data: any) {
        try {
            const teamRepo = getCustomRepository(TeamRepo)
            const memberRepo = getCustomRepository(MemberRepository)
            const team = await teamRepo.createAndSave({
                ...data,
                leader: await memberRepo.findOne(data.leader)
            })
            team.members = await memberRepo.findByIds(data.members)
            await teamRepo.save(team)
            team.members_count = team.members.length
            return team
        } catch (err) {
            console.log('Create Team fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get permanent teams
     */
    public async getPermanentTeams() {
        const teamRepo = getCustomRepository(TeamRepo)
        return await teamRepo.getMany(false)
    }

    /**
     * Get temporary teams
     */
    public async getTemporaryTeams() {
        const teamRepo = getCustomRepository(TeamRepo)
        return await teamRepo.getMany(true)
    }
}