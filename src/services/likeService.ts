import { ForumPostModel } from '../models/forumPost/forumPostsModel';

export class LikeService {

    public likePost = async (forumPostId: string, userId: string) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        const likeIndex = forumPost.likes.findIndex((likes: any) => likes.toString() === userId);
        if (likeIndex < 0) {
            forumPost.likes.push(userId);
            await forumPost.save();
            return {
                status: "Like added",
                userId: userId
            }
        } else {
            throw Error("User already liked")
        }
    }

    public deleteLike = async (forumPostId: string, userId: string) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        const likeIndex = forumPost.likes.findIndex((likes: any) => likes.toString() === userId);
        if (likeIndex >= 0) {
            forumPost.likes.splice(likeIndex, 1)
            await forumPost.save()
            return userId
        } else {
            throw new Error('Like does not exist');
        }

    }
}

