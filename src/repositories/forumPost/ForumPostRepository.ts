import { ForumPostModel } from "../../models/forumPost/forumPostsModel";
import { IForumPostRepository } from "./IForumPostRepository";

export class ForumPostRepository implements IForumPostRepository {



    async getAll(limit: number, offset: number): Promise<ForumPostModel[]> { 
        const model = await ForumPostModel.getInstance();
        return await model.find({}).sort({ 'createdAt': -1 }).skip(offset).limit(limit).exec();
    }

    async create(forumPost: ForumPostModel): Promise<ForumPostModel> { 
        const model = await ForumPostModel.getInstance();
        return await model.create(forumPost)
    }


    async findOne(forumPostId: string): Promise<ForumPostModel | null> {
        const model = await ForumPostModel.getInstance();
        return await model.findOne({ _id: forumPostId }).exec();
    }

    async countAll() : Promise<number> {
        const model = await ForumPostModel.getInstance();
        return await model.countDocuments();
    }

    async findOneAndDelete(forumPostId: string): Promise<ForumPostModel | null> {
        const model = await ForumPostModel.getInstance();
        return  await model.findOneAndDelete({ _id: forumPostId }).exec();
    }

    async findOneAndUpdate(forumPostId: string,newForumPostData:Object): Promise<ForumPostModel| null> {
        const model = await ForumPostModel.getInstance();
        return await model.findOneAndUpdate({ _id: forumPostId }, newForumPostData).exec();
    }

}