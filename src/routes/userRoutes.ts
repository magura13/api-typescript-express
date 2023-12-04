import { Router, json } from 'express';
import { UserController } from '../controllers/userControllers';
import { Middleware } from '../middlewares/validationMiddleware';
import { UserService } from '../services/userServices';

const router = Router();
const userServiceInstance = new UserService();
const userController = new UserController(userServiceInstance);
const middleware = new Middleware();

router.post('/', json(),middleware.ensureAuthenticated, userController.getValidationRules(), userController.createUser);
router.patch('/', json(),middleware.ensureAuthenticated, userController.getValidationRules(), userController.createUser);
router.get('/',json(),middleware.ensureAuthenticated,userController.getAll);

export default router;
