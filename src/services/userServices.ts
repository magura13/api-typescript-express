import { UserModel } from '../models/userModels';

export class UserService {
  public async createUser(newUser: { userName: string; password: string; email: string }): Promise<any> {
    const model = await UserModel.getInstance();
    return model.create(newUser);
  }

  public async getUsers(): Promise<any> {
    const model = await UserModel.getInstance();
    const users = model.find({})
    return users
  }

  public getUserbyEmail = async (email:string) => {
    const model = await UserModel.getInstance();
    const user = await model.findOne({'email':email}).exec();
    return user
  }
}
