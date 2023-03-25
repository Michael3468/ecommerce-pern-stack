import { Router } from 'express';

import TypeController from '../controllers/typeController';
import checkRole from '../middleware/checkRoleMiddleware';

const typeRouter = Router();
const typeController = new TypeController();

typeRouter.post('/', checkRole('ADMIN'), typeController.create);
typeRouter.get('/', typeController.getAll);

export default typeRouter;
