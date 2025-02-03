import { NextFunction } from 'express'
import Joi from 'joi'

type Property = 'body' | 'query' | 'params'
export const validator = (schema: Joi.Schema, property: Property) => {
  return async (req: any, _: any, next: NextFunction) => {
    try {
      req[property] = await schema.validateAsync(req[property])

      next()
    } catch (e: any) {
      e.statusCode = 422
      next(e)
    }
  }
}
