import mongoose, { Model, Document } from 'mongoose'
import { DbConnection } from '../database/dbConnect'

interface IUser extends Document {
  userName: string
  password: string
  email: string
}

export class UserModel {
  private static instance: Model<IUser>

  private constructor() {}

  public static async getInstance(): Promise<Model<IUser>> {
    if (!this.instance) {
      await DbConnection.getInstance().connect()

      // Define the schema
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
      })

      this.instance = mongoose.model<IUser>('User', userSchema)
    }
    return this.instance
  }
}
