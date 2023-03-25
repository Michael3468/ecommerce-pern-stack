import { Router } from 'express';

import DeviceController from '../controllers/deviceController';
import checkRole from '../middleware/checkRoleMiddleware';

const deviceRouter = Router();
const deviceController = new DeviceController();

deviceRouter.post('/', checkRole('ADMIN'), deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);

export default deviceRouter;
