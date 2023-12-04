import { Router, json } from 'express';
import { UserController } from '../controllers/userControllers';
import { Middleware } from '../middlewares/validationMiddleware';
import { UserService } from '../services/userServices';

const router = Router();
const userServiceInstance = new UserService();
const userController = new UserController(userServiceInstance);
const middleware = new Middleware();


router.post('/',json(),userController.verifyUser);

export default router;
