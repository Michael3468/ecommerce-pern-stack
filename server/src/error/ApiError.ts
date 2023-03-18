import { UniqueConstraintError } from 'sequelize';

class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(error: Error) {
    if (error instanceof UniqueConstraintError) {
      const errorMessage = error.errors[0].message;
      return new ApiError(404, errorMessage);
    }

    return new ApiError(404, error.message);
  }

  static internal(error: Error) {
    return new ApiError(500, error.message);
  }

  static forbidden(error: Error) {
    return new ApiError(403, error.message);
  }
}

export default ApiError;
