import express, { Application } from 'express'
import compression from "compression"  // compresses requests
import bodyParser from "body-parser"

import apiRouter from '@/routers/api'
import lineRouter from '@/routers/line'

export default (app: Application) => {
    app.use(compression())

    // Uploaded files
    app.use('/uploads', express.static(__dirname + '/../../uploads'))

    // Line
    app.use(lineRouter())

    // API
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    app.use(apiRouter())

    app.use((req, res, next) => {
        return res.status(400).end()
    })

    return app
}