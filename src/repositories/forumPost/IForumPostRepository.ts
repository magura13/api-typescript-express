import { ForumPostModel } from '../../models/forumPost/forumPostsModel';

export interface IForumPostRepository {
  create(forumPost: ForumPostModel): Promise<ForumPostModel>;
  getAll(limit: number, offset: number): Promise<ForumPostModel[]>;
  countAll(): Promise<number>;
  findOne(forumPostId: string): Promise<ForumPostModel | null>;
  findOneAndDelete(forumPostId: string): Promise<ForumPostModel | null>;
  findOneAndUpdate(
    forumPostId: string,
    newForumPostData: Object
  ): Promise<ForumPostModel | null>;
}
