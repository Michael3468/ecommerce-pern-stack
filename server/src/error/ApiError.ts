type TSequelizeUniqueConstraintError = {
  errors: Array<{
    message: string;
    type: string;
    path: string;
    value: string;
    origin: string;
    instance: string[];
    validatorKey: string;
    validatorName: string | null;
    validatorArgs: string[];
  }>;
};

class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(error: Error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const errorMessage = (error as unknown as TSequelizeUniqueConstraintError).errors[0].message;
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
