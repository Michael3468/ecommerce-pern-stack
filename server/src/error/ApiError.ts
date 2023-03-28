import { UniqueConstraintError } from 'sequelize';

type TApiErrorParams = {
  message?: string;
  error?: Error;
};

class ApiError extends Error {
  status: number;
  cause?: Error;

  constructor(status: number, message: string | undefined, error?: Error) {
    super(message);
    this.status = status;
    this.cause = error;
  }

  /**
   * If you use 'error' param you don't need to use 'message',
   * cause in this case it will not be used in ErrorHandlerMiddleware.ts"
   */
  static badRequest(apiErrorParams: TApiErrorParams): ApiError {
    const { message, error } = apiErrorParams;

    if (error instanceof UniqueConstraintError) {
      const errorMessage = error.errors[0].message;
      return new ApiError(404, errorMessage, error);
    }

    if (error instanceof Error) {
      return new ApiError(404, error.message, error);
    }

    return new ApiError(404, message);
  }

  /**
   * If you use 'error' param you don't need to use 'message',
   * cause in this case it will not be used in ErrorHandlerMiddleware.ts"
   */
  static internal(apiErrorParams: TApiErrorParams): ApiError {
    const { message, error } = apiErrorParams;

    if (error instanceof Error) {
      return new ApiError(500, error.message, error);
    }

    return new ApiError(500, message);
  }

  /**
   * If you use 'error' param you don't need to use 'message',
   * cause in this case it will not be used in ErrorHandlerMiddleware.ts"
   */
  static forbidden(apiErrorParams: TApiErrorParams): ApiError {
    const { message, error } = apiErrorParams;

    if (error instanceof Error) {
      return new ApiError(403, error.message, error);
    }

    return new ApiError(403, message);
  }
}

export default ApiError;
