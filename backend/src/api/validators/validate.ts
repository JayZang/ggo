import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'

export default (): RequestHandler => {
  return (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty())
      return res.status(400).json(error.mapped())

    next()
  }
}