const ApiError = require('../error/ApiError');
const { Brand } = require('../models/models');

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new BrandController();
