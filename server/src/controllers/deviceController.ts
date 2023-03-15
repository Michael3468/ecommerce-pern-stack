import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';

import { v4 as uuid_v4 } from 'uuid';

import ApiError from '../error/ApiError';
import { Device } from '../models/models';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type IReq = {
  files: {
    img: any
  }
}

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = (req  as unknown as IReq).files;
      const fileName = uuid_v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });
      return res.json(device);
    } catch (err) {
      next(ApiError.badRequest((err as ApiError).message));
    }
  }

  async getAll(req: Request, res: Response) {}
  async getOne(req: Request, res: Response) {}
}

export default DeviceController;
