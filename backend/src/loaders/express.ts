import express, { Application } from 'express'
import compression from "compression"  // compresses requests
import bodyParser from "body-parser"

import apiRouter from '@/api'

export default (app: Application) => {
    app.use(compression())
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

    app.use('/uploads', express.static(__dirname + '/../../uploads'))
    app.use(apiRouter())

    app.use((req, res, next) => {
        return res.status(400).end()
    })

    return app
}