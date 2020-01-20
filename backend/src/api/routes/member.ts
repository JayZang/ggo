import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import MemberService from '@/services/MemberService'
import TeamService from '@/services/TeamService'
import { CreateAndEditMember, CreateEmergenctContact } from '@/api/validators/member'

const router = Router()
const memberService = Container.get(MemberService)
const teamService = Container.get(TeamService)

export default (app: Router) => {
    app.use('/members', router)

    router.post('', CreateAndEditMember(), async (req: Request, res: Response) => {
        const member = await memberService.create(req.body)

        return member ?
            res.json(member) :
            res.status(400).end()
    })

    router.get('', async (req, res) => {
        const members = await memberService.get({
            skip: req.query.offset || 0,
            take: req.query.count || 10
        })

        return res.json(members)
    })

    router.get('/count-statistic', async (req, res) => {
        const countStatistic = await memberService.getCountStatistic()
        return res.json(countStatistic)
    })

    router.patch('/:id', CreateAndEditMember(), async (req: Request, res: Response) => {
        const member = await memberService.update(
            req.params.id,
            req.body
        )

        return member ?
            res.json(member) :
            res.status(400).end()
    })

    router.delete('/:id', async (req, res) => {
        const member = await memberService.delete(req.params.id)

        return member ?
            res.json(member) :
            res.status(400).end()
    })

    router.get('/:id', async (req, res) => {
        const member = await memberService.getBaseInfoById(
            req.params.id
        )

        return member ?
            res.json(member) :
            res.status(400).end()
    })

    router.post('/:id/emergency-contacts', CreateEmergenctContact(), async (req: Request, res: Response) => {
        const emergencyContact = await memberService.createEmergencyContact(req.params.id, req.body)

        return emergencyContact ?
            res.json(emergencyContact) :
            res.status(400).end()
    })

    router.get('/:id/emergency-contacts', async (req, res) => {
        const emergenctContacts = await memberService.getEmergenctContactsById(req.params.id)

        return emergenctContacts ? 
            res.json(emergenctContacts) :
            res.status(400).end()
    })

    router.delete('/emergency-contacts/:id', async (req, res) => {
        const emergencyContact = await memberService.deleteEmergencyContact(req.params.id)

        return emergencyContact ?
            res.json(emergencyContact) :
            res.status(400).end()
    })

    router.get('/:id/teams', async (req, res) => {
        const teams = await teamService.getByMember(req.params.id)

        return teams ? 
            res.json(teams) :
            res.status(400).end()
    })
}