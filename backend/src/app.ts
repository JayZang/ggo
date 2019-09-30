import "module-alias/register"
import "reflect-metadata"
import express from 'express'
import loader from './loaders'

const app = express()

loader(app)

export default app
