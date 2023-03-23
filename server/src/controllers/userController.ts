/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import ApiError from '../error/ApiError';
import { User, Basket } from '../models/models';

const generateJwt = (id: number, email: string, role: string): string =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY as string, { expiresIn: '24h' });

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    // TODO add types
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('incorrect email or password'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('user with this email already exists'));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // TODO add types
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal('User not found'));
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return next(ApiError.internal('Password is not correct'));
      }

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (err) {
      return next(ApiError.internal((err as Error).message, err as Error));
    }
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const id = req.query?.id ?? '';
    if (!id) {
      next(ApiError.badRequest("'id' not specified"));
    }
    return res.json(id);
  }
}

export default UserController;
