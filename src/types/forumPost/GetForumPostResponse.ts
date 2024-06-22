import { ForumPostModel } from "../../models/forumPost/forumPostsModel"

export type GetForumPostReponse = {
    hasMore: boolean,
    forumPosts: ForumPostModel[]
}