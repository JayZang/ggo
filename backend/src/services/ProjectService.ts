import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import moment from 'moment'

import { TaskStatus } from '@/entity/Task'
import Customer from '@/entity/Customer'
import Project, { ProjectSrcType } from '@/entity/Project'
import TeamRepo from '@/repository/TeamRepository'
import ProjectRepo from '@/repository/ProjectRepository'
import CustomerRepo from '@/repository/CustomerRepository'
import MemberRepo from '@/repository/MemberRepository'
import TaskHelper from '@/helper/TaskHelper'
import Member, { MemberStatus } from '@/entity/Member'
import Team from '@/entity/Team'

@Service()
export default class ProjectService {

    /**
     * Create one project
     */
    public  async create(data: any) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const project = projectRepo.create()

            await this.assignProjectData(project, data)

            return await projectRepo.save(project)
        } catch (err) {
            console.log('Create Project fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Update one project
     */
    public  async update(id: string, data: any) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const project = await projectRepo.findOneOrFail(id)

            if (project.finish_datetime)
                return null

            await this.assignProjectData(project, data)

            return await projectRepo.save(project)
        } catch (err) {
            console.log('Update Project fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get projects
     */
    public async get(option?: {
        skip: number,
        take: number,
    }) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.find({
                ...option,
                order: {  id: 'DESC' },
                relations: [
                    'customer', 
                    'managers', 
                    'team_participants', 
                    'member_participants'
                ]
            })
        } catch (err) {
            console.log('Get Projects fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get project by id
     * 
     * @param id 
     */
    public async getById(id: string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.findOneOrFail(id, {
                relations: [
                    'customer', 
                    'tasks', 
                    'tasks.assignment', 
                    'managers', 
                    'team_participants', 
                    'member_participants'
                ]
            }).then(async (project) => {
                await TaskHelper.attachTasksAssignment(project.tasks)
                return project
            })
        } catch (err) {
            console.log('Get Projects by id fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Add Project Manager
     */
    public async addManager(projectId: number | string, memberId: number | string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const memberRepo = getCustomRepository(MemberRepo)

            const project = await projectRepo.findOneOrFail(projectId, {
                relations: [
                    'customer',
                    'managers', 
                    'team_participants',
                    'member_participants'
                ]
            })

            if (project.finish_datetime) return null

            const member = await memberRepo.initQueryBuilder()
                .withIdCondition(memberId)
                .withStatusCondition(MemberStatus.active)
                .getOne()

            if (!member) return null

            if (project.managers.findIndex(manager => manager.id === member.id) === -1)
                project.managers.push(member)
            project.member_participants = project.member_participants.filter(participant => {
                return participant.id !== member.id
            })
            
            return await projectRepo.save(project)
        } catch (err) {
            console.log('Add project manager fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Remove Project Manager
     */
    public async removeManager(projectId: number | string, memberId: number | string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const memberRepo = getCustomRepository(MemberRepo)

            const project = await projectRepo.findOneOrFail(projectId, {
                relations: [
                    'customer',
                    'managers', 
                    'team_participants',
                    'member_participants'
                ]
            })

            if (project.finish_datetime) return null

            const member = await memberRepo.findOneOrFail(memberId)

            // project needs at least one manager
            if (project.managers.length <= 1)
                return null

            project.managers = project.managers.filter(manager => manager.id !== member.id)

            return await projectRepo.save(project)
        } catch (err) {
            console.log('Remove project manager fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Add Project Member Participant
     */
    public async addMemberParticipant(projectId: number | string, memberId: number | string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const memberRepo = getCustomRepository(MemberRepo)

            const project = await projectRepo.findOneOrFail(projectId, {
                relations: [
                    'customer',
                    'managers', 
                    'team_participants',
                    'member_participants'
                ]
            })

            if (project.finish_datetime) return null

            const member = await memberRepo.initQueryBuilder()
                .withIdCondition(memberId)
                .withStatusCondition(MemberStatus.active)
                .getOne()

            if (!member) return null

            if (project.managers.findIndex(manager => manager.id === member.id) !== -1)
                return null
            if (project.member_participants.findIndex(memberParticipant => memberParticipant.id === member.id) === -1)
                project.member_participants.push(member)
            
            return await projectRepo.save(project)
        } catch (err) {
            console.log('Add project member participant fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Remove Project Member Participant
     */
    public async removeMemberParticipant(projectId: number | string, memberId: number | string) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            const memberRepo = getCustomRepository(MemberRepo)

            const project = await projectRepo.findOneOrFail(projectId, {
                relations: [
                    'customer',
                    'managers', 
                    'team_participants',
                    'member_participants'
                ]
            })

            if (project.finish_datetime) return null

            const member = await memberRepo.findOneOrFail(memberId)

            project.member_participants = project.member_participants.filter(memberParticipant => memberParticipant.id !== member.id)
            
            return await projectRepo.save(project)
        } catch (err) {
            console.log('Remove project member participant fail')
            console.log(err.toString())
            return null
        }
    }

    /**
     * Get project total count
     */
    public async getTotalCount() {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.count()
        } catch (err) {
            console.log('Get Projects total count fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Get project count by source type
     */
    public async getCountBySrcType(type: ProjectSrcType) {
        try {
            const projectRepo = getCustomRepository(ProjectRepo)
            return await projectRepo.count({
                source_type: type
            })
        } catch (err) {
            console.log('Get Projects count by source type fail')
            console.log(err.toString())
            return 0
        }
    }

    /**
     * Assign project data, prepare project entire data to store to db
     */
    private async assignProjectData(project: Project, data: any): Promise<void> {
        const teamRepo = getCustomRepository(TeamRepo)
        const memberRepo = getCustomRepository(MemberRepo)
        const customerRepo = getCustomRepository(CustomerRepo)

        let teamParticipantsPromise: Promise<Team[]>
        let memberParticipantsPromise: Promise<Member[]>
        let customer: Customer | null = null

        const managers = await memberRepo.initQueryBuilder()
            .withStatusCondition(MemberStatus.active)
            .withIdsCondition(data.manager_ids)
            .getMany()

        if (managers.length === 0)
            return Promise.reject('Project has to have at least one manager')

        if (data.source_type == ProjectSrcType.Customer)
            customer = await customerRepo.findOneOrFail(data.customer_id)

        if (data.team_participant_ids)
            teamParticipantsPromise = teamRepo.findByIds(data.team_participant_ids)
        if (data.member_participant_ids && data.member_participant_ids.length)
            memberParticipantsPromise = memberRepo.initQueryBuilder()
                .withStatusCondition(MemberStatus.active)
                .withIdsCondition(data.member_participant_ids.filter((id: string | number) => {
                    return data.manager_ids.findIndex((manager_id: number | string) => manager_id == id) === -1
                }))
                .getMany()

        const [ 
            memberParticipants, 
            teamParticipants 
        ]= await Promise.all([
            memberParticipantsPromise, 
            teamParticipantsPromise
        ])

        project.name = data.name
        project.description = data.description || null
        project.start_datetime = data.start_datetime
        project.deadline_datetime = data.deadline_datetime
        project.quote = data.quote || null
        project.remark = data.remark || null
        project.source_type = data.source_type
        project.customer = customer
        project.managers = managers
        project.member_participants = memberParticipants || []
        project.team_participants = teamParticipants || []
    }
}