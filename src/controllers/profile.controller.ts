import express, { Router } from 'express'
import Controller from '../interfaces/controller.interface'
import { auth } from '../middlewares/passport'

export default class ProfileController implements Controller {
  path: string = '/profile'
  router: Router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      this.path,
      auth('bearer', { session: false }),
      this.getProfile.bind(this)
    )
  }

  private async getProfile(req: express.Request, res: express.Response) {
    return res.json(req.user)
  }
}
