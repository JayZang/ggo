import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import TaskService from '@/services/TaskService'
import TeamService from '@/services/TeamService'
import MemberService from '@/services/MemberService'
import { CreateTeamValidator } from '@/api/validators/team'
import validatePermission from '@/api/middleware/validatePermission'

const router = Router()
const teamService = Container.get(TeamService)
const taskService = Container.get(TaskService)
const memberService = Container.get(MemberService)

export default (app: Router) => {
    app.use('/teams', validatePermission('team_management'), router)

    router.post('/', CreateTeamValidator(), async (req: Request, res: Response) => {
        const team = await teamService.create(req.body)
        return team ?
            res.json(team) :
            res.status(400).end() 
    })

    router.get('/permanent', async (req, res) => {
        const teams = await teamService.getPermanentTeams()
        return res.json(teams)
    })

    router.get('/temporary', async (req, res) => {
        const teams = await teamService.getTemporaryTeams()
        return res.json(teams)
    })

    router.put('/:id', CreateTeamValidator(), async (req: Request, res: Response) => {
        const team = await teamService.update(req.params.id, req.body)
        return team ?
            res.json(team) :
            res.status(400).end() 
    })
    
    router.get('/:id', async (req, res) => {
        const team = await teamService.getById(req.params.id)
        return team ?
            res.json(team) :
            res.status(400).end()
    })

    router.get('/:id/members', async (req, res) => {
        const members = await memberService.getMembersByTeam(req.params.id)
        return members ?
            res.json(members) :
            res.status(400).end()
    })

    router.get('/:id/tasks', async (req, res) => {
        const tasks = await taskService.getTasksByTeam(req.params.id, {
            skip: req.query.offset || 0,
            take: req.query.count || 10
        })
        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })
}