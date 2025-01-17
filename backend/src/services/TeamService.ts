import { Service } from 'typedi'

import TeamRepo from '@/repository/TeamRepository'
import { getCustomRepository } from 'typeorm'
import MemberRepository from '@/repository/MemberRepository'
import { MemberStatus } from '@/entity/Member'

@Service()
export default class TeamService {

    /**
     * Create one team
     */
    public async create(data: any) {
        try {
            const teamRepo = getCustomRepository(TeamRepo)
            const memberRepo = getCustomRepository(MemberRepository)

            const [leader, members] = await Promise.all([
                memberRepo.initQueryBuilder()
                    .withStatusCondition(MemberStatus.active)
                    .withIdCondition(data.leader)
                    .getOne(),
                memberRepo.initQueryBuilder()
                    .withStatusCondition(MemberStatus.active)
                    .withIdsCondition(data.members)
                    .getMany()
            ])

            if (!leader || members.length === 0)
                return null

            const team = await teamRepo.createAndSave({
                ...data,
                leader,
                members
            })

            team.members_count = team.members.length
            return team
        } catch (err) {
            console.log('Create Team fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Update team
     */
    public async update(id: string | number, data: any) {
        try {
            const teamRepo = getCustomRepository(TeamRepo)
            const memberRepo = getCustomRepository(MemberRepository)

            const team = await teamRepo.findOneOrFail(id)
            const [leader, members] = await Promise.all([
                memberRepo.initQueryBuilder()
                    .withStatusCondition(MemberStatus.active)
                    .withIdCondition(data.leader)
                    .getOne(),
                memberRepo.initQueryBuilder()
                    .withStatusCondition(MemberStatus.active)
                    .withIdsCondition(data.members)
                    .getMany()
            ])

            if (!leader || members.length === 0)
                return null

            Object.assign(team, data)
            team.leader = leader
            team.members = members
            team.members_count = team.members.length
            return await teamRepo.save(team)
        } catch (err) {
            console.log('Update Team fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get permanent teams
     */
    public async getPermanentTeams() {
        const teamRepo = getCustomRepository(TeamRepo)
        return await teamRepo
            .initQueryBuilder()
            .withTaskAssignmentsRelation()
            .withLeaderRelation()
            .withMembersRelation()
            .withIsTemporaryCondition(false)
            .getMany()
    }

    /**
     * Get temporary teams
     */
    public async getTemporaryTeams() {
        const teamRepo = getCustomRepository(TeamRepo)
        return await teamRepo
            .initQueryBuilder()
            .withTaskAssignmentsRelation()
            .withLeaderRelation()
            .withMembersRelation()
            .withIsTemporaryCondition(true)
            .getMany()
    }

    /**
     * Get teams by member
     */
    public async getByMember(id: string | number) {
        try {
            const memberRepo = getCustomRepository(MemberRepository)
            const member = await memberRepo.findOneOrFail(id, {
                relations: ['teams', 'teams_as_leader']
            })
            return [
                ...member.teams_as_leader,
                ...member.teams
            ]
        } catch (err) {
            console.log('Get teams by member fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get team by team id
     */
    public async getById(id: string | number) {
        try {
            const teamRepo = getCustomRepository(TeamRepo)
            return await teamRepo.findOneOrFail(id,{
                relations: ['leader', 'members']
            })
        } catch (err) {
            console.log('Get team by id fail')
            console.log(err.toString())
            return null
        }
    }
}