/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';
import { Brand } from '../models/models';
import { TBrandControllerCreateRequest } from './types';

class BrandController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name }: TBrandControllerCreateRequest = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      next(ApiError.badRequest('Could not create brand', error as Error));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      next(ApiError.badRequest('Could not get all brands', error as Error));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }
}

export default BrandController;
