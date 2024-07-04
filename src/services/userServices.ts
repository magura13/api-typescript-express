import bcrypt from 'bcrypt';
import { UserModel } from '../models/user/userModel';
import { Encrypt } from '../shared/encrypt';
import { UserRepository } from '../repositories/user/UserRepository';

export class UserService {
  private _repository: UserRepository;

  constructor(repository: UserRepository) {
    this._repository = repository;
  }

  public async createUser(user: User): Promise<any> {
    const salt = await bcrypt.genSalt(Encrypt.saltRounds);
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = encryptedPassword;

    return this._repository.create(user);
  }

  public async getUsers(limit: number, offset: number): Promise<any> {
    return this._repository.getAll(limit, offset);
  }

  public async getUserbyId(userId: string) {
    return this._repository.findOneById(userId);
  }

  public async deleteUserbyId(userId: string) {
    return this._repository.deleteById(userId);
  }

  public async getUserByEmail(userEmail: string) {
    return this._repository.findOneByEmail(userEmail);
  }

  public async changeUserData(userId: string, updatedData: User) {
    const model = await UserModel.getInstance();
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(Encrypt.saltRounds);
      const encryptedPassword = await bcrypt.hash(updatedData.password, salt);

      const user = {
        email: updatedData.email,
        userName: updatedData.userName,
        password: encryptedPassword,
      };

      return await model
        .findOneAndUpdate({ _id: userId }, user, { new: true })
        .exec();
    } else {
      const user = {
        email: updatedData.email,
        userName: updatedData.userName,
        password: updatedData.password,
      };

      return await model
        .findOneAndUpdate({ _id: userId }, user, { new: true })
        .exec();
    }
  }
}
