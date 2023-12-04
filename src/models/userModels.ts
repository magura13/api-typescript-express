import mongoose, { Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { DbConnection } from '../database/dbConnect';

interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
}

export class UserModel {
  private static instance: Model<IUser>;
  static saltRounds: number = 10;

  private constructor() { }

  public static async getInstance(): Promise<Model<IUser>> {
    if (!this.instance) {
      await DbConnection.getInstance().connect();

      const userSchema = new mongoose.Schema({
        userName: {
          type: String,
          required: true,
          unique: true,
          trim: true,

        },
        password: {
          type: String,
          required: true,

        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,

        },
      });

      userSchema.pre<IUser>('save', async function (next) {
        if (!this.isModified('password')) return next();

        try {
          const salt = await bcrypt.genSalt(UserModel.saltRounds);
          this.password = await bcrypt.hash(this.password, salt);
          next();
        } catch (error) {
          if (error instanceof Error) {
            next(error);
          } else {
            next(new Error('Erro desconhecido ao criptografar senha'));
          }
        }
      });


      this.instance = mongoose.model<IUser>('User', userSchema);
    }
    return this.instance;
  }

  public static async createUser(userData: { userName: string; password: string; email: string }): Promise<IUser> {
    const model = await this.getInstance();
    const user = new model(userData);
    return user.save();
  }
}
