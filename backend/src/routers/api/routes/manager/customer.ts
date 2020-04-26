import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import { CreateCustomer } from '@/routers/api/validators/customer'
import CustomerService from '@/services/CustomerService'
import validatePermission from '@/routers/api/middleware/validatePermission'
import getImageMulter from '@/utils/multer/getImageMulter'

const router = Router()
const customerService = Container.get(CustomerService)
const customerLogoUpload = getImageMulter()

export default (app: Router) => {
    app.use('/customers', validatePermission('customer_management'), router)

    router.post('', customerLogoUpload.single('logo'), CreateCustomer(), async (req: Request, res: Response) => {
        const customer = await customerService.create(req.body, req.file)

        return customer ?
            res.json(customer) :
            res.status(400).end()
    })

    router.get('', async (req: Request, res: Response) => {
        const customers = await customerService.get()
        
        return customers ?
            res.json(customers) :
            res.status(400).end()
    })
}