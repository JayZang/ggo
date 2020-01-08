import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import ProjectService from '@/services/ProjectService'
import TaskService from '@/services/TaskService'
import { CreateAndEditProject, FinishProject } from '../validators/project'
import { ProjectSrcType } from '@/entity/Project'

const router = Router()
const projectService = Container.get(ProjectService)
const taskService = Container.get(TaskService)

export default (app: Router) => {
    app.use('/projects', router)

    router.post('', CreateAndEditProject(), async (req: Request, res: Response) => {
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
    
    router.get('/:id', async (req: Request, res: Response) => {
        const project = await projectService.getById(req.params.id)
        
        return project ?
            res.json(project) :
            res.status(400).end()
    })
    
    router.patch('/:id', CreateAndEditProject(), async (req: Request, res: Response) => {
        const project = await projectService.update(req.params.id, req.body)
        
        return project ?
        res.json(project) :
        res.status(400).end()
    })
    
    router.get('/:id/tasks', async (req: Request, res: Response) => {
        const tasks = await taskService.getByProjectId(parseInt(req.params.id))
        
        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })
    
    router.post('/:id/finish', FinishProject(),  async (req: Request, res: Response) => {
        const project = await projectService.finish(req.params.id, req.body.date)
        
        return project ?
            res.json(project) :
            res.status(400).end()
    })
}