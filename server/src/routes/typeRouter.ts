import { Router } from 'express';
import TypeController from '../controllers/typeController';

const typeRouter = Router();
const typeController = new TypeController();

typeRouter.post('/', typeController.create);
typeRouter.get('/', typeController.getAll);

export default typeRouter;
