import { Request, Response } from 'express';
import { CommentService } from '../services/commentService';
import { CommentValidationMiddleware } from '../middlewares/validation/comment/commentValidationMiddleware';

export class CommentController {
  private _middleware: CommentValidationMiddleware;
  private _commentService: CommentService;

  constructor(CommentService: CommentService) {
    this._commentService = CommentService;
    this._middleware = new CommentValidationMiddleware();
  }

  public createComment = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const newComment = req.body;
      const forumPostId = req.params.forumPostId;
      const addedComment = await this._commentService.createComment(forumPostId, newComment);
      return res.status(200).json({
        response: { default: 'Comment added successfully', addedComment },
      });
    } catch (error: any) {
      if (error.kind === "ObjectId") {
        return res.status(404).json({
          errors: { default: 'Post Id not found' },
        })
      }
      else {
        return res.status(500).json({
          errors: { default: 'Internal server errorr' }
        });
      }

    }
  }

  public get getCommentValidationRules() {
    return this._middleware.getCommentValidationRules;
  }
}