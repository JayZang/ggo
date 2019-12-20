import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import ProjectService from '@/services/ProjectService'
import { CreateProject } from '../validators/project'
import { ProjectSrcType } from '@/entity/Project'

const router = Router()
const projectService = Container.get(ProjectService)

export default (app: Router) => {
    app.use('/projects', router)

    router.post('', CreateProject(), async (req: Request, res: Response) => {
        const project = await projectService.create(req.body)

        return project ?
            res.json(project) :
            res.status(400).end()
    })

    router.get('', async (req: Request, res: Response) => {
        const projects = await projectService.get({
            skip: req.query.offset || 0,
            take: req.query.count || 10
        })
        
        return projects ?
            res.json(projects) :
            res.status(400).end()
    })

    router.get('/count-statistic', async (req: Request, res: Response) => {
        const [
            totalCount,
            srcTypeInternalCount
        ] = await Promise.all([
            projectService.getTotalCount(),
            projectService.getCountBySrcType(ProjectSrcType.Internal)
        ])
        
        return res.json({
            totalCount,
            srcTypeInternalCount,
            srcTypeCustomerCount: totalCount - srcTypeInternalCount
        })
    })
}