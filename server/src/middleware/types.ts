import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

interface ICheckAuthMiddlewareRequest extends Request {
  user: Jwt | null;
}

// eslint-disable-next-line import/prefer-default-export
export { ICheckAuthMiddlewareRequest };
