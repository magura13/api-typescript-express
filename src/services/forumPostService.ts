import { ForumPostModel } from '../models/forumPost/forumPostsModel';
import { ForumPostRepository } from '../repositories/forumPost/ForumPostRepository';
import { GetForumPostReponse } from '../types/forumPost/GetForumPostResponse';

export class ForumPostService {

  private _repository : ForumPostRepository

  constructor(repository: ForumPostRepository) {
    this._repository = repository
  }


  public async createForumPost(forumPost:ForumPostModel): Promise<ForumPostModel> {
    return await this._repository.create(forumPost)
  }

  public async getForumPosts(limit:number,offset:number) :Promise<GetForumPostReponse> {

    const forumPosts = await this._repository.getAll(limit,offset);
    const totalForumPosts = await this._repository.countAll();
    const hasMore = offset + limit < totalForumPosts
    
    return {hasMore,forumPosts};
  }

  public getforumPostbyId = async (forumPostId: string) : Promise<Object | null> => {
    return await this._repository.findOne(forumPostId);
  };

  public deleteForumPostbyId = async (forumPostId: string) : Promise<Object | null>=> {
    return this._repository.findOneAndDelete(forumPostId);
  };

  public changeForumPostData = async (forumPostId:string, newForumPostData:Object) =>{
    return this._repository.findOneAndUpdate(forumPostId,newForumPostData);
  }
} 
