import { Router, json } from 'express';
import { UserController } from '../controllers/userControllers';
import { EnsureAuthenticatedMiddleware } from '../middlewares/authentication/ensureAuthenticatedMiddleware';
import { UserService } from '../services/userServices';

const router = Router();
const userServiceInstance = new UserService();
const userController = new UserController(userServiceInstance);
const authenticationMiddleware = new EnsureAuthenticatedMiddleware();


router.post('/', json(),userController.getValidationRules(), userController.createUser);

router.get('/',json(),authenticationMiddleware.ensureAuthenticated,userController.getAll);
router.get('/:userId',json(),authenticationMiddleware.ensureAuthenticated,userController.getUserIdValidationRules(),userController.getUserbyId);

router.patch('/:userId', json(),authenticationMiddleware.ensureAuthenticated, userController.getChangeUserValidationRules(), userController.changeUserData);

router.delete('/:userId',json(),authenticationMiddleware.ensureAuthenticated,userController.getUserIdValidationRules(),userController.deleteUserbyId);

export default router;
