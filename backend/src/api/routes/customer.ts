import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import multer from 'multer'

import CustomerService from '@/services/CustomerService'
import { CreateCustomer } from '@/api/validators/customer'

const router = Router()
const customerService = Container.get(CustomerService)
const customerLogoUpload = multer({ 
    fileFilter: (req, file, cb) => {
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype))
            cb(null, true)
        else
            cb(new Error('檔案上傳錯誤，只能上傳圖檔'), false)
    }
})

export default (app: Router) => {
    app.use('/customers', router)

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