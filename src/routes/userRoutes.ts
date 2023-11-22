import { Router } from 'express'
import { UserController } from '../controllers/userControllers'
import bodyParser from 'body-parser'
import { userService } from '../services/userServices'
import { query, matchedData, validationResult ,body} from 'express-validator';


const router = Router();
const jsonParser = bodyParser.json();
const userServiceInstance = new userService();
const userController = new UserController(userServiceInstance);
router.post('/', jsonParser, userController.getValidationRules(), userController.createUser.bind(userController));

export default router
