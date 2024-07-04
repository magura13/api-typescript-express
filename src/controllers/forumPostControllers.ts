import { Request, Response } from 'express';
import { ForumPostService } from '../services/forumPostService';
import { ForumPostValidationMiddleware } from '../middlewares/validation/forumPost/forumPostValidationMiddleware';

export class ForumPostController {
  private _middleware: ForumPostValidationMiddleware;
  private _forumPostService: ForumPostService;

  constructor(ForumPostService: ForumPostService) {
    this._forumPostService = ForumPostService;
    this._middleware = new ForumPostValidationMiddleware();
  }

  public createForumPost = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const newForumPost = req.body;
      const forumPost =
        await this._forumPostService.createForumPost(newForumPost);
      return res.status(200).json({
        response: { default: 'Forum post added successfully', forumPost },
      });
    } catch (error: any) {
      return res.status(500).json({
        errors: { default: 'Internal server errorr' },
      });
    }
  };

  public getAllForumPosts = async (req: Request, res: Response) => {
    try {
      const offset: number = Number(req.query.offset);
      const limit: number = Number(req.query.limit);
      const allForumPosts = await this._forumPostService.getForumPosts(
        limit,
        offset
      );
      return res.status(200).json({ data: allForumPosts });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        error: { default: 'Internal server error' },
      });
    }
  };

  public getForumPostbyId = async (req: Request, res: Response) => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const forumPostId = req.params.forumPostId;
      const forumPost =
        await this._forumPostService.getforumPostbyId(forumPostId);
      return res.status(200).json({ data: forumPost });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        error: { default: 'Internal server error' },
      });
    }
  };

  public deleteForumPostbyId = async (req: Request, res: Response) => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const forumPostId = req.params.forumPostId;
      const forumPost: any =
        await this._forumPostService.deleteForumPostbyId(forumPostId);
      return res.status(200).json({
        message: `Post ${forumPost?.content.title} id:${forumPost?.id} was deleted`,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        error: { default: 'Internal server error' },
      });
    }
  };

  public changeForumPostData = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const bodyLength = Object.keys(req.body).length;
      if (bodyLength === 0) {
        return res.status(400).json({
          response: {
            default: `Request was made, but since you haven't inserted properties to be changed, it didn't changed nothing.`,
          },
        });
      }
      const forumPostId = req.params.forumPostId;
      const forumPostNewData = req.body;
      await this._forumPostService.changeForumPostData(
        forumPostId,
        forumPostNewData
      );
      return res.status(200).json({
        response: {
          default: `User data was updated, to check :http://localhost:8000/user/${forumPostId}`,
        },
      });
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        return res.status(404).json({
          errors: { default: 'Post Id not found' },
        });
      } else {
        return res.status(500).json({
          errors: { default: 'Internal server errorr' },
        });
      }
    }
  };
  public get getForumPostValidationRules() {
    return this._middleware.forumPostValidationRules;
  }

  public get getForumPostIdValidationRules() {
    return this._middleware.forumPostIdValidationRules;
  }

  public get getChangeForumPostValidationRules() {
    return this._middleware.changeForumPostValidationRules;
  }
}
