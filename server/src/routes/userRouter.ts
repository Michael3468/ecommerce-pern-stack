import { Router } from 'express';

import UserController from '../controllers/userController';
import checkAuth from '../middleware/checkAuthMiddleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', checkAuth, userController.check);

export default userRouter;
