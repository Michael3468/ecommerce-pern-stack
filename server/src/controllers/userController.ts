/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';

class UserController {
  async registration(req: Request, res: Response): Promise<void> {}

  async login(req: Request, res: Response): Promise<void> {}

  async check(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const id = req.query?.id ?? '';
    if (!id) {
      next(ApiError.badRequest(new Error("'id' not specified")));
    }
    return res.json(id);
  }
}

export default UserController;
