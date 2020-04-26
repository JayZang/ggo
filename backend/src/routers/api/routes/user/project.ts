import { Router, Response, Request } from 'express'
import { Container } from 'typedi'

import { CreateAndEditTask, UpdateTaskStatus } from '@/routers/api/validators/task'
import validateIdentity from '@/routers/api/middleware/validateIdentity'
import { FinishProject } from '@/routers/api/validators/project'
import UserProjectService from '@/services/UserArea/UserProjectService'
import { UserIdentityType } from '@/entity/User'

const router = Router()
const userProjectService = Container.get(UserProjectService)

export default (app: Router) => {
    app.use('/projects', validateIdentity([
        UserIdentityType.manager,
        UserIdentityType.member
    ]), router)

    router.get('/', async (req, res) => {
        const member = req.user!.identity
        const projects = await userProjectService.get(member, {
            take: req.query.count || 10,
            skip: req.query.offset || 0
        })

        return projects ?
            res.json(projects) :
            res.status(400).end()
    })

    router.get('/simple-statistic', async (req, res) => {
        const member = req.user!.identity
        const statistic = await userProjectService.getSimpleStatistic(member)

        return statistic ?
            res.json(statistic) :
            res.status(400).end()
    })

    router.get('/:id', async (req, res) => {
        const member = req.user!.identity
        const project = await userProjectService.getDetail(req.params.id, member)

        return project ?
            res.json(project) :
            res.status(400).end()
    })
  
    router.post('/:id/finish', FinishProject(),  async (req: Request, res: Response) => {
        const member = req.user!.identity
        const project = await userProjectService.finish(req.params.id, req.body.date, member)
        
        return project ?
            res.json(project) :
            res.status(400).end()
    })

    router.post('/:id/tasks', CreateAndEditTask(), async (req: Request, res: Response) => {
        const member = req.user!.identity!
        const task = await userProjectService.createTask(
            req.params.id,
            req.body, 
            member
        )

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })

    router.post('/:projectId/tasks/:taskId/status', UpdateTaskStatus(), async (req: Request, res: Response) => {
        const member = req.user!.identity!
        const task = await userProjectService.updateTaskStatus(
            req.params.taskId, 
            req.body.status, 
            member
        )

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })

    router.get('/:projectId/tasks/:taskId', async (req: Request, res: Response) => {
        const member = req.user!.identity!
        const task = await userProjectService.getTask(
            req.params.taskId, 
            member
        )

        return task ? 
            res.json(task) : 
            res.status(400).end()
    })
}