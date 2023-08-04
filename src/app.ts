import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import passport from 'passport'
import { Server } from 'socket.io'
import { bearerStrategy, googleStrategy } from './config/auth'
import Controller from './interfaces/controller.interface'
import * as error from './middlewares/error'

export default class App {
  private app: express.Application
  private path = '/api'

  constructor(controllers: Controller[]) {
    this.app = express()
    this.app.use(
      cors({
        origin: process.env.CLIENT_APP_URL,
      })
    )
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorMiddlewares()
  }

  initializeSocket() {
    const httpServer = createServer(this.app)
    const io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_APP_URL,
      },
    })
    return { server: httpServer, io }
  }

  private initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(passport.initialize())
    passport.use(googleStrategy)
    passport.use(bearerStrategy)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(this.path, controller.router)
    })
  }

  private initializeErrorMiddlewares() {
    this.app.use(error.unauthorizedError)
    this.app.use(error.validationError)
    this.app.use(error.unprocessableError)
    this.app.use(error.databaseError)
    this.app.use(error.showError)
  }
}
