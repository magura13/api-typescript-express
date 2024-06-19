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

  public removeComment = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const commentId = req.params.commentId;
      const forumPostId = req.params.forumPostId;
      const requesterUserId = req.params.userId;

      

      const commentIdRemoved = await this._commentService.deleteComment(forumPostId, commentId, requesterUserId);
      return res.status(200).json({
        response: { default: 'Comment deleted successfully', commentIdRemoved },
      });
    } catch (error: any) {
      if (error.kind === "ObjectId") {
        return res.status(404).json({
          errors: { default: 'Post Id not found' },
        })
      }
       else if (error.message==="Comment doesnt exist") {
        return res.status(404).json({
          errors: { default: 'Comment Id not found' },
        })
       }
       else if (error.message==="UserNotOwner") {
        return res.status(403).json({
          errors: { default: 'Cannot delete another persons comment' },
        })
       }

      else {
        return res.status(500).json({
          errors: { default: 'Internal server errorr' }
        });
      }

    }
  }

  public changeComment = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const middlewareError = this._middleware.validateRequest(req, res);
      if (middlewareError) {
        return res.status(400).json({ ValidationErrors: middlewareError });
      }
      const comment = req.body;
      const forumPostId = req.params.forumPostId;
      const addedComment = await this._commentService.changeComment(forumPostId, comment);
      return res.status(200).json({
        response: { default: 'Comment changed successfully', addedComment },
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
  };

  public get getCommentRemovalValidationRules() {
    return this._middleware.getCommentRemovalValidationRules;
  };

  public get getCommentChangeValidationRules() {
    return this._middleware.getCommentChangeValidationRules;
  }
}