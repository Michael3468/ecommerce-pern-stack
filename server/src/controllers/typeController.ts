/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';
import { Type } from '../models/models';

class TypeController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (err) {
      next(ApiError.badRequest(err as Error));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (err) {
      next(ApiError.badRequest(err as Error));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }
}

export default TypeController;
