import mongoose, { Model } from 'mongoose';

export class ForumPostModel {
  private static instance: Model<IForumPost>;

  private constructor() {}

  public static async getInstance(): Promise<Model<IForumPost>> {
    if (!this.instance) {
      const forumPostSchema = new mongoose.Schema(
        {
          userId: {
            type: String,
            required: true,
          },
          userName: {
            type: String,
            required: true,
            trim: true,
          },
          content: {
            title: {
              type: String,
              required: true,
            },
            message: {
              type: String,
              required: true,
            },
            images: [
              {
                sort: {
                  type: Number,
                },
                extension: {
                  type: String,
                },
                path: {
                  type: String,
                },
              },
            ],
          },
          likes: { type: Array<String> },
          comments: [
            {
              userId: {
                type: String,
              },
              message: {
                type: String,
              },
              userName: {
                type: String,
              },
              isActive: {
                type: Boolean,
                default: true,
              },
            },
          ],
        },
        { timestamps: true }
      );
      this.instance = mongoose.model<IForumPost>('ForumPost', forumPostSchema);
    }
    return this.instance;
  }
}
