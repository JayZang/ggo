import { RequestHandler } from 'express'
import { validationResult, matchedData } from 'express-validator'

export default (): RequestHandler => {
  return (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty())
      return res.status(400).json(error.mapped())

    // Only get the values which pass the validation
    // It prevents clients inject the invalid fields
    req.body = matchedData(req, {
      locations: ['body']
    })

    next()
  }
}