import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

import ApiError from '../error/ApiError';
import { ICheckAuthMiddlewareRequest } from './types';

function checkAuth(req: Request, res: Response, next: NextFunction): Response | void {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token-string
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    const decoded = jwt.verify(token, secretKey);

    (req as ICheckAuthMiddlewareRequest).user = decoded as Jwt;
    return next();
  } catch (error) {
    return next(ApiError.forbidden({ error: error as Error }));
  }
}

export default checkAuth;
