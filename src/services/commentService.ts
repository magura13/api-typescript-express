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
                comment:comment
            }
        }
    }
}