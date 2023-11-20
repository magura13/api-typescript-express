import { UserModel } from '../models/userModels'

export class userService {
  async createUser(newUser: object): Promise<any> {
    let samuca = await UserModel.getInstance()
    await samuca.create(newUser)
  }
}
