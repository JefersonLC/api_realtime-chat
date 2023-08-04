import express, { Router } from 'express'
import Controller from '../interfaces/controller.interface'
import { NewMessage } from '../interfaces/message.interface'
import { auth } from '../middlewares/passport'
import { validateSchema } from '../middlewares/validate'
import { newMessage } from '../schemas/message.schema'
import MessageService from '../services/message.service'
import { getPaginateParams } from '../utils/query'

export default class MessageController implements Controller {
  path: string = '/messages'
  router: Router = Router()
  message: MessageService

  constructor() {
    this.message = new MessageService()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .all(auth('bearer', { session: false }))
      .get(this.getMessages.bind(this))
      .post(validateSchema(newMessage, 'body'), this.sendMessage.bind(this))
  }

  private async getMessages(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { limit, offset } = getPaginateParams(req)
      const messages = await this.message.getMessages(limit, offset)
      return res.json(messages)
    } catch (error) {
      return next(error)
    }
  }

  private async sendMessage(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const data: NewMessage = req.body
      const newMessage = await this.message.createMessage(data)
      return res.json(newMessage)
    } catch (error) {
      return next(error)
    }
  }
}
