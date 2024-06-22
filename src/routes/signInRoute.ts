import { Router, json } from 'express';
import { UserController } from '../controllers/userControllers';
import { UserService } from '../services/userServices';
import { UserRepository } from '../repositories/user/UserRepository';

const router = Router();
const userRepository = new UserRepository();
const userServiceInstance = new UserService(userRepository);
const userController = new UserController(userServiceInstance);

router.post(
  '/',
  userController.getSignInValidationRules(),
  userController.verifyUser
);

export default router;
