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
            if (commentIndex>=0) {
                forumPost.comments.splice(commentIndex,1)
                await forumPost.save()
                return commentId
            } else {
                throw new Error('Comment doesnt exist');   
            }

        }
    }

    public changeComment = async (forumPostId: string,commentData:IComment) => {
        const model = await ForumPostModel.getInstance();
        const forumPost: any = await model.findOne({ _id: forumPostId })
        if (forumPost) {
            const forumPostComments = forumPost.comments;
            const commentIndex = forumPostComments.findIndex((comment:any)=> comment._id.toString() ===  commentData.commentId.toString() );
            const commentRetrieved = forumPostComments[commentIndex];
            const hasIsActive = commentData.hasOwnProperty('isActive')
            if(hasIsActive){
                commentRetrieved.isActive = commentData.isActive
                forumPost.comments[commentIndex] = commentRetrieved
                await forumPost.save()
                return commentRetrieved
            } else if (commentRetrieved.message){
                commentRetrieved.message = commentData.message
                forumPost.comments[commentIndex] = commentRetrieved
                await forumPost.save()
                return commentRetrieved
            }       
        }
    }
}