/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';
import { Brand } from '../models/models';

class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (err) {
      next(ApiError.badRequest((err as ApiError).message));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (err) {
      next(ApiError.badRequest((err as ApiError).message));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }
}

export default BrandController;
