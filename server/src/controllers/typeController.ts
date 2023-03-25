/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';
import { Type } from '../models/models';
import { TTypeControllerCreateRequest } from './types';

class TypeController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name }: TTypeControllerCreateRequest = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      // TODO: add return?
      next(ApiError.badRequest('Could not create type', error as Error));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      next(ApiError.badRequest('Could not create all types', error as Error));
    }

    return res.status(404).json({ error: 'Resource not found' });
  }
}

export default TypeController;
