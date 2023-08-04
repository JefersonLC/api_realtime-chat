import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import UnauthorizedException from '../exceptions/UnathorizedException'

export function unauthorizedError(
  error: UnauthorizedException,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof UnauthorizedException) {
    return res.status(error.status).json({
      name: error.name,
      status: error.status,
      message: error.message,
    })
  }
  return next(error)
}

export function validationError(
  error: ZodError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      name: 'ValidationError',
      status: 400,
      issues: error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    })
  }
  return next(error)
}

export function unprocessableError(
  error: PrismaClientKnownRequestError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(422).json({
      name: 'UnprocessableError',
      status: 422,
      message: 'There was an error processing the data',
    })
  }
  return next(error)
}

export function databaseError(
  error: PrismaClientKnownRequestError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof PrismaClientInitializationError) {
    return res.status(503).json({
      name: 'DatabaseError',
      status: 503,
      message: 'Our database is not ready',
    })
  }
  return next(error)
}

export function showError(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  return res.json({
    name: error.name,
    message: error.message,
  })
}
