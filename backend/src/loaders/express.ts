import { Application } from 'express'
import compression from "compression"  // compresses requests
import session from "express-session"
import bodyParser from "body-parser"

import apiRouter from '@/api'

export default (app: Application) => {
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(apiRouter())

  app.use((req, res, next) => {
    return res.status(400).end()
  })

  return app
}