import { ForumPostModel } from '../models/forumPost/forumPostsModel';

export class ForumPostService {

  public async createForumPost(newForumPost:IForumPost): Promise<IForumPost> {
    const model = await ForumPostModel.getInstance();
    return await model.create(newForumPost);
  }

  public async getForumPosts(limit:number,offset:number) :Promise<Object> {
    const model = await ForumPostModel.getInstance();
    const data = await model.find({}).sort({'createdAt':-1}).skip(offset).limit(limit).exec();
    const totalForumPosts = await model.countDocuments();
    const hasMore = offset + limit < totalForumPosts
    const response = {hasMore,data}
    return response
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
