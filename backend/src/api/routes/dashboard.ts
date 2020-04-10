import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import DashboardService from '@/services/DashboardService'
import validateIsAuth from '@/api/middleware/validateIsAuth'

const router = Router()
const dashboardService = Container.get(DashboardService)

export default (app: Router) => {
    app.use('/dashboard', validateIsAuth(), router)

    router.get('/tasks', async (req: Request, res: Response) => {
        const tasks = await dashboardService.getInProgressTasks(req.user)

        return tasks ?
            res.json(tasks) :
            res.status(400).end()
    })

    router.get('/projects', async (req: Request, res: Response) => {
        const projects = await dashboardService.getInProgressProjects(req.user)

        return projects ?
            res.json(projects) :
            res.status(400).end()
    })

    router.get('/work-reports', async (req: Request, res: Response) => {
        const workReports = await dashboardService.getLatestWorkReport(req.user)

        return workReports ?
            res.json(workReports) :
            res.status(400).end()
    })
}