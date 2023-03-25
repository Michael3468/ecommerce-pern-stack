import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

type TRole = 'ADMIN';

interface ICheckAuthMiddlewareRequest extends Request {
  user: Jwt | null;
}

interface ICheckRoleMiddlewareRequest extends Request {
  user: Jwt | null;
}

export { TRole, ICheckAuthMiddlewareRequest, ICheckRoleMiddlewareRequest };
