import 'dotenv/config'
import App from './app'
import AuthController from './controllers/auth.controller'
import MessageController from './controllers/message.controller'
import ProfileController from './controllers/profile.controller'
import { validateEnv } from './utils/env'

validateEnv()

const port = Number(process.env.PORT)

const app = new App([
  new MessageController(),
  new AuthController(),
  new ProfileController(),
])

const { server, io } = app.initializeSocket()

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message)
  })
})

server.listen(port, () => {
  console.log('Server on port:', port)
})
