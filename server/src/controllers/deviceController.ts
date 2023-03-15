import path from 'path';
import { fileURLToPath } from 'url';

// import uuid from 'uuid';
import { v4 as uuid_v4 } from 'uuid';

import ApiError from '../error/ApiError';
import { Device } from '../models/models';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      // const fileName = uuid.v4() + '.jpg';
      const fileName = uuid_v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });
      return res.json(device);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res) {}
  async getOne(req, res) {}
}

export default DeviceController;
