// FIXME: import order rule
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import { Type } from '../models/models';

class TypeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (err) {
      next(ApiError.badRequest((err as ApiError).message));
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (err) {
      next(ApiError.badRequest((err as ApiError).message));
    }
  }
}

export default TypeController;
