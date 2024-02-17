import { Router } from 'express';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { LikeController } from '../controllers/likeController';
import { LikeService } from '../services/likeService';

const router = Router();
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();
const likeServiceInstance = new LikeService()
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