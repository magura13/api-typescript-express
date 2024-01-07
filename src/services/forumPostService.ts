import { ForumPostModel } from '../models/forumPost/forumPostsModel';

export class ForumPostService {

  public async createForumPost(newForumPost:IForumPost): Promise<IForumPost> {
    const model = await ForumPostModel.getInstance();
    return model.create(newForumPost);
  }

  public async getForumPosts() :Promise<Object> {
    const model = await ForumPostModel.getInstance();
    const data = await model.find({});
    return data
  }

  public getforumPostbyId = async (forumPostId: string) : Promise<Object | null> => {
    const model = await ForumPostModel.getInstance();
    const forumPost = await model.findOne({ _id: forumPostId }).exec();
    return forumPost;
  };

  public deleteForumPostbyId = async (forumPostId: string) : Promise<Object | null>=> {
    const model = await ForumPostModel.getInstance();
    const forumPost = await model.findOneAndDelete({ _id: forumPostId }).exec();
    return forumPost;
  };

  public changeForumPostData = async (forumPostId:string, newForumPostData:Object) =>{
    const model = await ForumPostModel.getInstance();
    const forumPost = await model.findOneAndUpdate({ _id: forumPostId }, newForumPostData).exec();
    return forumPost
  }
} 
