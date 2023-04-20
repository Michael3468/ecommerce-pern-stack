import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import ApiError from '../error/ApiError';
import { User, Cart } from '../models/models';
import { IUserControllerCheckRequest, IUserControllerRegistrationRequest } from './types';

const generateJwt = (id: number, email: string, role: string): string =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password, role }: IUserControllerRegistrationRequest = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest({ message: 'Incorrect email or password' }));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest({ message: 'User with this email already exists' }));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cart = await Cart.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);

      return res.json({ token });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest({ message: 'User not found' }));
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return next(ApiError.badRequest({ message: 'Password is not correct' }));
      }

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id, email, role } = (req as IUserControllerCheckRequest).user;
      const token = generateJwt(id, email, role);
      return res.json({ token });
    } catch (error) {
      return next(ApiError.forbidden({ error: error as Error }));
    }
  }
}

export default UserController;
