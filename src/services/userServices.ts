import bcrypt from 'bcrypt';
import { UserModel } from '../models/user/userModel';
import { Encrypt } from '../shared/encrypt';

export class UserService {
  public async createUser(newUser: IUser): Promise<any> {
    const salt = await bcrypt.genSalt(Encrypt.saltRounds);
    const encryptedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = encryptedPassword;
    const model = await UserModel.getInstance();
    return model.create(newUser);
  }

  public async getUsers(): Promise<any> {
    const model = await UserModel.getInstance();
    const users = model.find({});
    return users;
  }

  public getUserbyEmail = async (email: string) => {
    const model = await UserModel.getInstance();
    const user = await model.findOne({ email: email }).exec();
    return user;
  };

  public getUserbyId = async (userId: string) => {
    const model = await UserModel.getInstance();
    const user = await model.findOne({ _id: userId }).exec();
    return user;
  };
  public deleteUserbyId = async (userId: string) => {
    const model = await UserModel.getInstance();
    const user = await model.findOneAndDelete({ _id: userId }).exec();
    return user;
  };
  public changeUserData = async (userId: string, newUserData: any) => {
    const model = await UserModel.getInstance();
    if (newUserData.password) {
      const salt = await bcrypt.genSalt(Encrypt.saltRounds);
      const encryptedPassword = await bcrypt.hash(newUserData.password, salt);
      return await model
        .findOneAndUpdate(
          { _id: userId },
          {
            email: newUserData.email,
            userName: newUserData.userName,
            password: encryptedPassword,
          },
          { new: true }
        )
        .exec();
    } else {
      return await model
        .findOneAndUpdate(
          { _id: userId },
          {
            email: newUserData.email,
            userName: newUserData.userName,
            password: newUserData.password,
          },
          { new: true }
        )
        .exec();
    };
  }
}

