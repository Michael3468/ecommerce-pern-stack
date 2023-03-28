/* eslint-disable class-methods-use-this */
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
      return next(ApiError.badRequest('Could not create brand', error as Error));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      return next(ApiError.internal('Could not get all brands', error as Error));
    }
  }
}

export default BrandController;
