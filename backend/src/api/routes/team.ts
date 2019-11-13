import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import TeamService from '@/services/TeamService'

const router = Router()
const teamService = Container.get(TeamService)

export default (app: Router) => {
    app.use('/teams', router)

    router.get('/permanent', async (req, res) => {
        const teams = await teamService.getPermanentTeams()
        return res.json(teams)
    })

    router.get('/temporary', async (req, res) => {
        const teams = await teamService.getTemporaryTeams()
        return res.json(teams)
    })
}