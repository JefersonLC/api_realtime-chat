export default class UnauthorizedException extends Error {
  status: number
  name: string

  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedException'
    this.status = 401
    this.message = message
  }
}
