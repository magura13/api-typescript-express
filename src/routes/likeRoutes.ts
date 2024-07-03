import { Router } from 'express';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { LikeController } from '../controllers/likeController';
import { LikeService } from '../services/likeService';
import { ForumPostRepository } from '../repositories/forumPost/ForumPostRepository';

const router = Router();
const forumPostRepository = new ForumPostRepository();
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();
const likeServiceInstance = new LikeService(forumPostRepository)
const likeController = new LikeController(likeServiceInstance)

router.post(
  '/:forumPostId/:userId',
  authenticationMiddleware.ensureAuthenticated,
  likeController.getLikeValidationRules,
  likeController.createLike
);

router.delete(
  '/:forumPostId/:userId',
  authenticationMiddleware.ensureAuthenticated,
  likeController.getLikeValidationRules,
  likeController.removeLike
);

export default router