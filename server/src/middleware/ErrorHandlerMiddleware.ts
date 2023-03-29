import { NextFunction, Request, Response } from 'express';

import ApiError from '../error/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error);

  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Unexpected error' });
}

export default errorHandler;
