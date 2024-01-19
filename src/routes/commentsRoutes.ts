import { Router } from 'express';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { CommentController } from '../controllers/commentController';
import { CommentService } from '../services/commentService';

const router = Router();
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();
const commentServiceInstance = new CommentService()
const commentController = new CommentController(commentServiceInstance);

router.post(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentValidationRules,
  commentController.createComment
);

router.delete(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentRemovalValidationRules,
  commentController.removeComment
);

export default router