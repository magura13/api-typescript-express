import { Router } from 'express';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { CommentController } from '../controllers/commentController';
import { CommentService } from '../services/commentService';
import { ForumPostRepository } from '../repositories/forumPost/ForumPostRepository';

const router = Router();
const forumPostRepository = new ForumPostRepository();
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();
const commentServiceInstance = new CommentService(forumPostRepository)
const commentController = new CommentController(commentServiceInstance);

router.post(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentValidationRules,
  commentController.createComment
);

router.delete(
  '/:forumPostId/:commentId/:userId',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentRemovalValidationRules,
  commentController.removeComment
);

router.patch(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentChangeValidationRules,
  commentController.changeComment
);

export default router