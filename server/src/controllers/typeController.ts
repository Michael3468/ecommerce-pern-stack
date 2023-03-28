/* eslint-disable class-methods-use-this */ // TODO this rule to eslint?
import { Request, Response, NextFunction } from 'express';

import ApiError from '../error/ApiError';
import { Type } from '../models/models';
import { TTypeControllerCreateRequest } from './types';

class TypeController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name }: TTypeControllerCreateRequest = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      return next(ApiError.badRequest('Could not create type', error as Error));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      return next(ApiError.internal('Could not get all types', error as Error));
    }
  }
}

export default TypeController;
