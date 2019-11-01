import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import MemberService from '@/services/MemberService'
import { CreateMemberValidator, UpdateMemberValidator, CreateEmergenctContact } from '@/api/validators/member'

const router = Router()
const memberService = Container.get(MemberService)

export default (app: Router) => {
    app.use('/members', router)

    router.post('', CreateMemberValidator(), async (req: Request, res: Response) => {
        const member = await memberService.create(req.body)

        return member ?
            res.json(member) :
            res.status(400).end()
    })

    router.get('', async (req, res) => {
        const members = await memberService.all()

        return res.json(members)
    })

    router.patch('/:id', UpdateMemberValidator(), async (req: Request, res: Response) => {
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
}