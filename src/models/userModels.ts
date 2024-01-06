import mongoose, { Model } from 'mongoose';

export class UserModel {
  private static instance: Model<IUser>;
  private static error: Error;
  private constructor() { }

  public static async getInstance(): Promise<Model<IUser>> {
    if (!this.instance) {
      const userSchema = new mongoose.Schema(
        {
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
            index: true,
          },
          openToWork: {
            type: Boolean,
            default:true
          },
          programmingLanguages : [
            {
              language: String,
              experience: String,
            }
          ],
          workAt: [{
            type: String,
          }]

        },
        { timestamps: true }
      );
      this.instance = mongoose.model<IUser>('User', userSchema);
    }
    return this.instance;
  }
}
