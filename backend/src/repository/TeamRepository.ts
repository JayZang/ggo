import { EntityRepository } from 'typeorm'
import _ from 'lodash'

import Team from '@/entity/Team'
import TaskAssignment, { TaskAssignmentType } from '@/entity/TaskAssignment'
import { BaseRepository } from './BaseRepository'

@EntityRepository(Team)
class TeamRepository extends BaseRepository<Team> {

    /**
     * Insert one team
     */
    public async createAndSave(data: any, temporary = false) {
        const team = this.create()

        team.name = data.name
        team.description = data.description
        team.leader = data.leader
        team.members = data.members
        team.is_temporary = temporary
        team.status = 1

        return this.save(team)
    }

    public async getByMember(memberId: string | number) {
        const [ teamsAsLeader, teamsAsMember ] = await Promise.all([
            this.initQueryBuilder()
                .withLeaderCondition(memberId)
                .getMany(),
            this.initQueryBuilder()
                .withMemberCondition(memberId)
                .getMany()
        ])
        return [
            ...teamsAsLeader,
            ...teamsAsMember
        ]
    }

    public withTaskAssignmentsRelation() {
        this.queryBuilder.leftJoinAndMapMany(
            `${this.entityAlias}.task_assignments`, 
            TaskAssignment, 
            'taskAssignment', 
            `taskAssignment.target_id = ${this.entityAlias}.id AND taskAssignment.type = :type`, 
            { type: TaskAssignmentType.Team })
        return this
    }

    public withLeaderRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.leader`, 'leader')
        return this
    }

    public withMembersRelation() {
        this.queryBuilder.leftJoinAndSelect(`${this.entityAlias}.members`, 'members')
        return this
    }

    public withIsTemporaryCondition(isTemporary: boolean) {
        this.queryBuilder.andWhere('is_temporary = :isTemporary', { isTemporary })
        return this
    }

    public withLeaderCondition(memberId: string | number) {
        this.queryBuilder.andWhere(`${this.entityAlias}.leader_id = :leaderId`, { leaderId: memberId })
        return this
    }

    public withMemberCondition(memberId: string | number) {
        this.queryBuilder.innerJoinAndSelect(
            `${this.entityAlias}.members`, 
            'members', 
            `members.id = :memberId`,
            { memberId })
        return this
    }
}

export default TeamRepository