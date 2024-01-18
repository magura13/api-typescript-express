import { ForumPostModel } from '../models/forumPost/forumPostsModel';

export class CommentService {


    public createComment = async (forumPostId: string, comment: IComment) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        if (forumPost) {
            forumPost.comments.push(comment);
            await forumPost.save();
            return {
                status: "Comment added",
                comment: comment
            }
        }
    }

    public deleteComment = async (forumPostId: string, commentId: string) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        if (forumPost) {
            const forumPostComments = forumPost.comments;
            const commentIndex = forumPostComments.findIndex((comment:any)=> comment._id.toString() === commentId )
            forumPost.comments.splice(commentIndex,1)
            await forumPost.save()
        }
    }
}