import { UserModel } from "../../models/user/userModel";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {

    async create(user: UserModel): Promise<User> {
        const model = await UserModel.getInstance();
        return model.create(user);
    }

    async getAll(limit: number, offset: number): Promise<User[]> {
        const model = await UserModel.getInstance();
        return model.find({}).sort({ 'createdAt': -1 }).skip(offset).limit(limit).exec();
    }


    async findOneById(userId: string): Promise<User | null> {
        const model = await UserModel.getInstance();
        return await model.findOne({ _id: userId }).exec();
    }

    async deleteById(userId: string): Promise<User | null> {
        const model = await UserModel.getInstance();
        return await model.findOneAndDelete({ _id: userId }).exec();
    }

    async findOneByEmail(userEmail: string): Promise<User| null> {
        const model = await UserModel.getInstance();
        return await model.findOneAndDelete({ email:userEmail }).exec();
    }

    async updateById(userId: string, user: User): Promise<User | null> {
        const model = await UserModel.getInstance();
        return await model.findOneAndUpdate(
            { _id: userId },
            user,
            { new: true }
          )
          .exec();
    }
}
