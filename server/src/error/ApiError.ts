import { UniqueConstraintError } from 'sequelize';

class ApiError extends Error {
  status: number;
  message: string;
  error?: Error;

  constructor(status: number, message: string, error?: Error) {
    // TODO what params super can get here (cause)
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }

  static badRequest(message: string, error?: Error): ApiError {
    if (error instanceof UniqueConstraintError) {
      const errorMessage = error.errors[0].message;
      return new ApiError(404, errorMessage);
    }

    if (error instanceof Error) {
      return new ApiError(404, error.message);
    }

    return new ApiError(404, message);
  }

  static internal(message: string, error?: Error): ApiError {
    if (error instanceof Error) {
      return new ApiError(500, error.message);
    }

    return new ApiError(500, message);
  }

  static forbidden(message: string, error: Error): ApiError {
    if (error instanceof Error) {
      return new ApiError(403, error.message);
    }

    return new ApiError(403, message);
  }
}

export default ApiError;
