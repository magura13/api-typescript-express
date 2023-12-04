import { Router, json } from 'express';
import { UserController } from '../controllers/userControllers';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { UserService } from '../services/userServices';

const router = Router();
const userServiceInstance = new UserService();
const userController = new UserController(userServiceInstance);
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();

router.post('/', json(),authenticationMiddleware.ensureAuthenticated, userController.getValidationRules(), userController.createUser);
router.patch('/', json(),authenticationMiddleware.ensureAuthenticated, userController.getValidationRules(), userController.createUser);
router.get('/',json(),authenticationMiddleware.ensureAuthenticated,userController.getAll);

export default router;
