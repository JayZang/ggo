import { Router } from 'express'
import { Container } from 'typedi'

import WorkReportService from '@/services/WorkReportService'
import validatePermission from '@/api/middleware/validatePermission'

const router = Router()
const workReportService = Container.get(WorkReportService)

export default (app: Router) => {
    app.use('/work-reports', validatePermission('project_management'), router)

    router.get('', async (req, res) => {
        const workReports = await workReportService.get({
            skip: req.query.offset || 0,
            take: req.query.count || 10
        })

        return workReports ?
            res.json(workReports) :
            res.status(400).end()
    })
}