import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

import { USER_ROLE } from '../constants';

type TUserRole = typeof USER_ROLE.ADMIN | typeof USER_ROLE.USER;

interface ICheckAuthMiddlewareRequest extends Request {
  user: Jwt | null;
}

interface ICheckRoleMiddlewareRequest extends Request {
  user: Jwt | null;
}

export { TUserRole, ICheckAuthMiddlewareRequest, ICheckRoleMiddlewareRequest };
