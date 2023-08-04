import express from 'express'
import { ZodObject } from 'zod'

type Req = 'body' | 'params' | 'query'

export function validateSchema(schema: ZodObject<{}>, type: Req) {
  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      schema.parse(req[type])
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
