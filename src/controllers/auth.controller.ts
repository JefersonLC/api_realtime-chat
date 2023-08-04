import express, { Router } from 'express'
import Controller from '../interfaces/controller.interface'
import { auth } from '../middlewares/passport'
import { generateToken } from '../utils/token'

export default class AuthController implements Controller {
  path: string = '/auth'
  router: Router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      this.path + '/google',
      auth('google', { scope: ['email', 'profile'] })
    )
    this.router.get(
      this.path + '/google/callback',
      auth('google', { session: false }),
      this.getUser
    )
  }

  private getUser(req: express.Request, res: express.Response) {
    const appUrl = process.env.CLIENT_APP_URL as string
    const data = encodeURIComponent(JSON.stringify(req.user))
    const token = generateToken(data)

    return res.redirect(appUrl + '?access_token=' + token)
  }
}
