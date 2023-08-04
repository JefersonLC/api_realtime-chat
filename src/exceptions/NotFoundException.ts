export default class NotFoundException extends Error {
  status: number
  name: string

  constructor(message: string) {
    super(message)
    this.name = 'NotFoundException'
    this.status = 404
    this.message = message
  }
}
