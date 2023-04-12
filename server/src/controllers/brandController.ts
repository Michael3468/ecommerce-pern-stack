import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';
import { Brand } from '../models/models';
import { TBrandControllerCreateRequest } from './types';

class BrandController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name }: TBrandControllerCreateRequest = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      return next(ApiError.badRequest({ error: error as Error }));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      return next(ApiError.internal({ error: error as Error }));
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const brand = await Brand.findOne({ where: { id } });
      return res.json(brand);
    } catch (error) {
      return next(ApiError.internal({ error: error as Error }));
    }
  }
}

export default BrandController;
