import { Profile } from 'passport-google-oauth20'
import Database from '../database/connection'

export default class UserService {
  private database
  private userModel

  constructor() {
    this.database = new Database()
    this.userModel = this.database.user
  }

  async findUser(id: string) {
    const user = await this.userModel.findUnique({
      where: {
        id,
      },
    })
    await this.database.disconnect()
    return user
  }

  // async findUserIdOrError(id: string) {
  //   const user = await this.userModel.findUnique({
  //     select: {
  //       id: true,
  //     },
  //     where: {
  //       id,
  //     },
  //   })
  //   await this.database.disconnect()

  //   if (!user) throw new NotFoundException('User not found')
  //   return user
  // }

  async findOrCreate(data: Profile) {
    const user =
      (await this.findUser(data.id)) ||
      (await this.userModel.create({
        data: {
          id: data.id,
          name: data.displayName,
          given_name: data._json.given_name,
          family_name: data._json.family_name,
          email: data._json.email,
          locale: data._json.locale,
          picture: data._json.picture,
        },
      }))
    await this.database.disconnect()
    return user
  }
}
