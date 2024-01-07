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

export default router