import { Router } from 'express';

import BrandController from '../controllers/brandController';
import checkRole from '../middleware/checkRoleMiddleware';

const brandRouter = Router();
const brandController = new BrandController();

// TODO: move 'ADMIN' and 'USER' roles to constants
brandRouter.post('/', checkRole('ADMIN'), brandController.create);
brandRouter.get('/', brandController.getAll);
brandRouter.get('/:id', brandController.getOne);

export default brandRouter;
