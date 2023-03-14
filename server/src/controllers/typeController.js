const ApiError = require('../error/ApiError');
const { Type } = require('../models/models');

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new TypeController();
