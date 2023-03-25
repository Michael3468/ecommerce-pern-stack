import { Router } from 'express';

import BrandController from '../controllers/brandController';
import checkRole from '../middleware/checkRoleMiddleware';

const brandRouter = Router();
const brandController = new BrandController();

brandRouter.post('/', checkRole('ADMIN'), brandController.create);
brandRouter.get('/', brandController.getAll);

export default brandRouter;
