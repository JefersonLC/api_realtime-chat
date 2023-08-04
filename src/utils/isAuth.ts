import { Request } from 'express'
import UnauthorizedException from '../exceptions/UnathorizedException'

export function isAuth(req: Request) {
  if (!req.isAuthenticated()) {
    throw new UnauthorizedException('Unauthorized')
  }
  return req.user
}
