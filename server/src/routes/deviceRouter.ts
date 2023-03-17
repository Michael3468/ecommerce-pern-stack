import { Router } from 'express';

import DeviceController from '../controllers/deviceController';

const deviceRouter = Router();
const deviceController = new DeviceController();

deviceRouter.post('/', deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);

export default deviceRouter;
