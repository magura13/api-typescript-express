import { Router } from 'express';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { ForumPostController } from '../controllers/forumPostControllers';
import { ForumPostService } from '../services/forumPostService';
import { CommentController } from '../controllers/commentController';
import { CommentService } from '../services/commentService';
import { ForumPostRepository } from '../repositories/forumPost/ForumPostRepository';

const router = Router();
const forumPostRepository = new ForumPostRepository();
const forumPostServiceInstance = new ForumPostService(forumPostRepository);
const forumPostController = new ForumPostController(forumPostServiceInstance);
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();
const commentServiceInstance = new CommentService(forumPostRepository)
const commentController = new CommentController(commentServiceInstance);

router.post(
  '/',
  authenticationMiddleware.ensureAuthenticated,
  forumPostController.getForumPostValidationRules,
  forumPostController.createForumPost
);

router.get(
  '/',
  authenticationMiddleware.ensureAuthenticatedFixedToken,
  forumPostController.getAllForumPosts
);

router.get(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  forumPostController.getForumPostIdValidationRules,
  forumPostController.getForumPostbyId
);

router.delete(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  forumPostController.getForumPostIdValidationRules,
  forumPostController.deleteForumPostbyId
);

router.patch(
  '/:forumPostId',
  authenticationMiddleware.ensureAuthenticated,
  forumPostController.getChangeForumPostValidationRules,
  forumPostController.changeForumPostData
);

router.post(
  '/:forumPostId/comments',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentValidationRules,
  commentController.createComment
);

router.delete(
  '/:forumPostId/comments',
  authenticationMiddleware.ensureAuthenticated,
  commentController.getCommentRemovalValidationRules,
  commentController.removeComment
);

export default router