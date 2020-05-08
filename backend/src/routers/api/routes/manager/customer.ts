import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import { CreateCustomer, EditIndustryCategory } from '@/routers/api/validators/customer'
import CustomerService from '@/services/CustomerService'
import validatePermission from '@/routers/api/middleware/validatePermission'
import getImageMulter from '@/utils/multer/getImageMulter'

const router = Router()
const customerService = Container.get(CustomerService)
const customerLogoUpload = getImageMulter()

export default (app: Router) => {
    app.use('/customers', validatePermission('customer_management'), router)

    router.post('/', customerLogoUpload.single('logo'), CreateCustomer(), async (req: Request, res: Response) => {
        const customer = await customerService.create(req.body, req.file)

        return customer ?
            res.json(customer) :
            res.status(400).end()
    })

    router.put('/:id', customerLogoUpload.single('logo'), CreateCustomer(), async (req: Request, res: Response) => {
        const customer = await customerService.update(
            req.params.id,
            req.body, 
            req.file
        )

        return customer ?
            res.json(customer) :
            res.status(400).end()
    })

    router.get('/', async (req: Request, res: Response) => {
        const customers = await customerService.get()
        
        return customers ?
            res.json(customers) :
            res.status(400).end()
    })

    router.post('/industry-categories', EditIndustryCategory(), async (req: Request, res: Response) => {
        const industryCategory = await customerService.createIndustryCategory(req.body.name)

        return industryCategory ?
            res.json(industryCategory) :
            res.status(400).end()
    })

    router.put('/industry-categories/:id', EditIndustryCategory(), async (req: Request, res: Response) => {
        const industryCategory = await customerService.updateIndustryCategory(
            req.params.id,
            req.body.name
        )

        return industryCategory ?
            res.json(industryCategory) :
            res.status(400).end()
    })

    router.get('/industry-categories', async (req: Request, res: Response) => {
        const industryCategories = await customerService.getIndustryCategory()

        return industryCategories ?
            res.json(industryCategories) :
            res.status(400).end()
    })

    router.delete('/industry-categories/:id', async (req: Request, res: Response) => {
        const industryCategory = await customerService.removeIndustryCategory(req.params.id)

        return industryCategory ?
            res.json(industryCategory) :
            res.status(400).end()
    })
}