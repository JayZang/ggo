import { RequestHandler } from 'express'
import { body, CustomValidator } from 'express-validator'
import moment from 'moment'

export default (): CustomValidator => {
  return (value, { req, location, path }) => {
    const result = moment(value).isValid()
    result && (req[location][path] = moment(value))
    return result
  }
}