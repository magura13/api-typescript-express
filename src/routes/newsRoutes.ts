import { Router } from 'express';
import { NewsController } from '../controllers/newsController';

const router = Router();

router.get('/', NewsController.getNews);

export default router;