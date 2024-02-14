import { ForumPostModel } from '../models/forumPost/forumPostsModel';

export class LikeService {

    public likePost = async (forumPostId: string, userId: string) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        if (forumPost) {
            forumPost.likes.push(userId);
            await forumPost.save();
            return {
                status: "Comment added",
                userId: userId
            }
        }
    }

    public deleteComment = async (forumPostId: string, commentId: string) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        if (forumPost) {
            const forumPostComments = forumPost.comments;
            const commentIndex = forumPostComments.findIndex((comment: any) => comment._id.toString() === commentId)
            if (commentIndex >= 0) {
                forumPost.comments.splice(commentIndex, 1)
                await forumPost.save()
                return commentId
            } else {
                throw new Error('Comment doesnt exist');
            }

        }
    }
}
