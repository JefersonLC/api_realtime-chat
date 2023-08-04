import Database from '../database/connection'
import { NewMessage } from '../interfaces/message.interface'

export default class MessageService {
  private database
  private messageModel

  constructor() {
    this.database = new Database()
    this.messageModel = this.database.message
  }

  async getMessages(limit: number = 70, offset: number = 0) {
    const messages = await this.messageModel.findMany({
      take: limit,
      skip: offset,
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
    })
    await this.database.disconnect()
    return messages
  }

  async createMessage(data: NewMessage) {
    const { sender_id, text } = data
    const message = await this.messageModel.create({
      data: {
        sender_id,
        text,
      },
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
    })
    await this.database.disconnect()
    return message
  }
}
