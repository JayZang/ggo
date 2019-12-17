import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import TeamService from '@/services/TeamService'
import { CreateTeamValidator } from '@/api/validators/team'

const router = Router()
const teamService = Container.get(TeamService)

export default (app: Router) => {
    app.use('/teams', router)

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
}