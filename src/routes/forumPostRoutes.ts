import { Router} from 'express';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { ForumPostController } from '../controllers/forumPostControllers';
import { ForumPostService } from '../services/forumPostService';

const router = Router();
const forumPostServiceInstance = new ForumPostService();
const forumPostController = new ForumPostController(forumPostServiceInstance);
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();

router.post(
  '/',
  authenticationMiddleware.ensureAuthenticated,
  forumPostController.getForumPostValidationRules,
  forumPostController.createForumPost
);

router.get(
  '/',
  authenticationMiddleware.ensureAuthenticated,
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

export default router