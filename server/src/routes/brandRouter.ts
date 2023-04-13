import { Router } from 'express';

import { USER_ROLE } from '../constants';
import BrandController from '../controllers/brandController';
import checkRole from '../middleware/checkRoleMiddleware';

const brandRouter = Router();
const brandController = new BrandController();

brandRouter.post('/', checkRole(USER_ROLE.ADMIN), brandController.create);
brandRouter.get('/', brandController.getAll);
brandRouter.get('/:id', brandController.getOne);

export default brandRouter;
