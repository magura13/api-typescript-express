import { ForumPostRepository } from '../repositories/forumPost/ForumPostRepository';

export class LikeService {
  private _repository: ForumPostRepository;

  constructor(repository: ForumPostRepository) {
    this._repository = repository;
  }

  public likePost = async (forumPostId: string, userId: string) => {
    const forumPost: any = await this._repository.findOne(forumPostId);
    const likeIndex = forumPost.likes.findIndex(
      (likes: any) => likes.toString() === userId
    );
    if (likeIndex < 0) {
      forumPost.likes.push(userId);
      await forumPost.save();
      return {
        status: 'Like added',
        userId: userId,
      };
    } else {
      throw Error('User already liked');
    }
  };

  public deleteLike = async (forumPostId: string, userId: string) => {
    const forumPost: any = await this._repository.findOne(forumPostId);
    const likeIndex = forumPost.likes.findIndex(
      (likes: any) => likes.toString() === userId
    );
    if (likeIndex >= 0) {
      forumPost.likes.splice(likeIndex, 1);
      await forumPost.save();
      return userId;
    } else {
      throw new Error('Like does not exist');
    }
  };
}
