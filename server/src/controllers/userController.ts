import ApiError from '../error/ApiError';

class UserController {
  async registration(req, res) {}
  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest(`'id' not specified`));
    }
    res.json(id);
  }
}

export default UserController;
