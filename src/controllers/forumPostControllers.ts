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
      const forumPost = await this._forumPostService.createForumPost(newForumPost);
      return res.status(200).json({
        response: { default: 'Forum post added successfully', forumPost },
      });
    } catch (error: any) {
      return res.status(500).json({
        errors: { default: 'Internal server errorr' },
      });     
    }
  }
  public get getForumPostValidationRules() {
    return this._middleware.forumPostValidationRules
  }
}