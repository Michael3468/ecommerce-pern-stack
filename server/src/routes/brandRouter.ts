import { Router } from 'express';
import BrandController from '../controllers/brandController';

const brandRouter = Router();
const brandController = new BrandController();

brandRouter.post('/', brandController.create);
brandRouter.get('/', brandController.getAll);

export default brandRouter;
