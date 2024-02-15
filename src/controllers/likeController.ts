import { Request, Response } from 'express';
import { LikeService } from '../services/likeService';
import { LikeValidationMiddleware } from '../middlewares/validation/like/likeValidationMiddleware';

export class LikeController {
    private _middleware: LikeValidationMiddleware;
    private _likeService: LikeService;

    constructor(LikeService: LikeService) {
        this._likeService = LikeService;
        this._middleware = new LikeValidationMiddleware();
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
            const forumPostId = req.params.forumPostId;
            const userId = req.params.userId;
            const userLiked = await this._likeService.likePost(forumPostId, userId);
            return res.status(200).json({
                response: { default: 'Post liked by user:', userLiked },
            });
        } catch (error: any) {
            if (error.kind === "ObjectId") {
                return res.status(404).json({
                    errors: { default: 'Post Id not found' },
                })
            } else if (error.message === "User already liked") {
                return res.status(409).json({
                    errors: { default: 'User already liked' },
                })
            }
            else {
                return res.status(500).json({
                    errors: { default: 'Internal server errorr' }
                });
            }

        }
    }

    public get getLikeValidationRules() {
        return this._middleware.forumPostValidationRules
    }

}
//   public removeComment = async (
//     req: Request,
//     res: Response
//   ): Promise<Response<any, Record<string, any>>> => {
//     try {
//       const middlewareError = this._middleware.validateRequest(req, res);
//       if (middlewareError) {
//         return res.status(400).json({ ValidationErrors: middlewareError });
//       }
//       const commentId = req.params.commentId;
//       const forumPostId = req.params.forumPostId;
//       const commentIdRemoved = await this._commentService.deleteComment(forumPostId, commentId);
//       return res.status(200).json({
//         response: { default: 'Comment deleted successfully', commentIdRemoved },
//       });
//     } catch (error: any) {
//       if (error.kind === "ObjectId") {
//         return res.status(404).json({
//           errors: { default: 'Post Id not found' },
//         })
//       }
//        else if (error.message="Comment doesnt exist") {
//         return res.status(404).json({
//           errors: { default: 'Comment Id not found' },
//         })
//        }

//       else {
//         return res.status(500).json({
//           errors: { default: 'Internal server errorr' }
//         });
//       }

//     }

