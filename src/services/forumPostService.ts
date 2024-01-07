import { ForumPostModel } from '../models/forumPostsModel';

export class ForumPostService {
  public async createForumPost(newForumPost:IForumPost): Promise<any> {
    const model = await ForumPostModel.getInstance();
    return model.create(newForumPost);
  }
}