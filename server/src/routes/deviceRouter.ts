import { Router } from 'express';

import { USER_ROLE } from '../constants';
import DeviceController from '../controllers/deviceController';
import checkRole from '../middleware/checkRoleMiddleware';

const deviceRouter = Router();
const deviceController = new DeviceController();

deviceRouter.post('/', checkRole(USER_ROLE.ADMIN), deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);

export default deviceRouter;
