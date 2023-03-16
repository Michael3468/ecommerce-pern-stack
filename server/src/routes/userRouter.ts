import { Router } from 'express';

import UserController from '../controllers/userController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', userController.check);

export default userRouter;
