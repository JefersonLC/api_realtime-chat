import { PrismaClient } from '@prisma/client'

export default class Database {
  private database

  constructor() {
    this.database = new PrismaClient()
  }

  get user() {
    return this.database.user
  }

  get message() {
    return this.database.message
  }

  async disconnect() {
    try {
      await this.database.$disconnect()
    } catch (error) {
      await this.database.$disconnect()
      process.exit(1)
    }
  }
}
