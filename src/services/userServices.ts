import { UserModel } from '../models/userModels';

export class UserService {
  async createUser(newUser: { userName: string; password: string; email: string }): Promise<any> {
    const model = await UserModel.getInstance();
    return model.create(newUser);
  }
}
