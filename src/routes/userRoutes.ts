import { Router } from 'express';
import { UserController } from '../controllers/userControllers';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { UserService } from '../services/userServices';
import { UserRepository } from '../repositories/user/UserRepository';

const router = Router();
const userRepository = new UserRepository();
const userServiceInstance = new UserService(userRepository);
const userController = new UserController(userServiceInstance);
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();

router.post(
  '/',
  userController.getValidationRules(),
  userController.createUser
);

router.patch('/refresh', userController.refreshToken);

router.get(
  '/',
  authenticationMiddleware.ensureAuthenticated,
  userController.getAll
);
router.get(
  '/:userId',
  authenticationMiddleware.ensureAuthenticated,
  userController.getUserIdValidationRules(),
  userController.getUserbyId
);

router.patch(
  '/:userId',
  authenticationMiddleware.ensureAuthenticated,
  userController.getChangeUserValidationRules(),
  userController.changeUserData
);

router.delete(
  '/:userId',
  authenticationMiddleware.ensureAuthenticated,
  userController.getUserIdValidationRules(),
  userController.deleteUserbyId
);

export default router;
