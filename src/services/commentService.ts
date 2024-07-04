import { ForumPostModel } from '../models/forumPost/forumPostsModel';
import { ForumPostRepository } from '../repositories/forumPost/ForumPostRepository';

export class CommentService {
  private _repository: ForumPostRepository;

  constructor(repository: ForumPostRepository) {
    this._repository = repository;
  }

  public createComment = async (forumPostId: string, comment: IComment) => {
    const forumPost: any = await this._repository.findOne(forumPostId);
    if (forumPost) {
      forumPost.comments.push(comment);
      await forumPost.save();
      return {
        status: 'Comment added',
        comment: comment,
      };
    }
  };

  public deleteComment = async (
    forumPostId: string,
    commentId: string,
    requesterUserId: string
  ) => {
    const forumPost: any = await this._repository.findOne(forumPostId);

    if (forumPost) {
      const forumPostComments = forumPost.comments;
      const commentIndex = forumPostComments.findIndex(
        (comment: any) => comment._id.toString() === commentId
      );

      if (commentIndex >= 0) {
        const isCommentOwner =
          requesterUserId === forumPost.comments[commentIndex].userId;

        if (!isCommentOwner) {
          throw new Error('UserNotOwner');
        }
        forumPost.comments.splice(commentIndex, 1);

        await forumPost.save();

        return commentId;
      } else {
        throw new Error('Comment doesnt exist');
      }
    }
  };

  public changeComment = async (forumPostId: string, commentData: IComment) => {
    const forumPost: any = await this._repository.findOne(forumPostId);
    if (forumPost) {
      const forumPostComments = forumPost.comments;
      const commentIndex = forumPostComments.findIndex(
        (comment: any) =>
          comment._id.toString() === commentData.commentId.toString()
      );
      const commentRetrieved = forumPostComments[commentIndex];
      const hasIsActive = commentData.hasOwnProperty('isActive');
      if (hasIsActive) {
        commentRetrieved.isActive = commentData.isActive;
        forumPost.comments[commentIndex] = commentRetrieved;
        await forumPost.save();
        return commentRetrieved;
      } else if (commentRetrieved.message) {
        commentRetrieved.message = commentData.message;
        forumPost.comments[commentIndex] = commentRetrieved;
        await forumPost.save();
        return commentRetrieved;
      }
    }
  };
}
