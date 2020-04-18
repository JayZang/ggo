import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import { ProjectSrcType } from '@/entity/Project'
import TaskService from '@/services/TaskService'
import ProjectService from '@/services/ProjectService'
import validatePermission from '@/api/middleware/validatePermission'
import { CreateAndEditProject } from '@/api/validators/project'

const router = Router()
const projectService = Container.get(ProjectService)
const taskService = Container.get(TaskService)

export default (app: Router) => {
    app.use('/projects', validatePermission('project_management'), router)

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
    
    router.put('/:id', CreateAndEditProject(), async (req: Request, res: Response) => {
        const project = await projectService.update(req.params.id, req.body)
        
        return project ?
        res.json(project) :
        res.status(400).end()
    })

    router.post('/:projectId/manager/:memberId', async (req: Request, res: Response) => {
        const project = await projectService.addManager(
            req.params.projectId, 
            req.params.memberId
        )
        
        return project ?
            res.json(project) :
            res.status(400).end()
    })
    
    router.delete('/:projectId/manager/:memberId', async (req: Request, res: Response) => {
        const project = await projectService.removeManager(
            req.params.projectId, 
            req.params.memberId
        )
        
        return project ?
        res.json(project) :
        res.status(400).end()
    })
    
    router.post('/:projectId/member-participant/:memberId', async (req: Request, res: Response) => {
        const project = await projectService.addMemberParticipant(
            req.params.projectId, 
            req.params.memberId
        )
        
        return project ?
            res.json(project) :
            res.status(400).end()
    })

    router.delete('/:projectId/member-participant/:memberId', async (req: Request, res: Response) => {
        const project = await projectService.removeMemberParticipant(
            req.params.projectId, 
            req.params.memberId
        )
        
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
}