import { UniqueConstraintError } from 'sequelize';

class ApiError extends Error {
  status: number;
  cause?: Error;

  constructor(status: number, message: string, error?: Error) {
    super(message);
    this.status = status;
    this.cause = error;
  }

  /**
   * TODO Make the `message` parameter optional with a `?` sign
   * for the `catch` block where it is not needed
   */
  static badRequest(message: string, error?: Error): ApiError {
    if (error instanceof UniqueConstraintError) {
      const errorMessage = error.errors[0].message;
      return new ApiError(404, errorMessage, error);
    }

    if (error instanceof Error) {
      return new ApiError(404, error.message, error);
    }

    return new ApiError(404, message);
  }

  static internal(message: string, error?: Error): ApiError {
    if (error instanceof Error) {
      return new ApiError(500, error.message, error);
    }

    return new ApiError(500, message);
  }

  static forbidden(message: string, error: Error): ApiError {
    if (error instanceof Error) {
      return new ApiError(403, error.message, error);
    }

    return new ApiError(403, message);
  }
}

export default ApiError;
