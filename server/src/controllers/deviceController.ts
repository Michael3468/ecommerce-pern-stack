/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

import ApiError from '../error/ApiError';
import { Device } from '../models/models';
import getMd5FileName from '../utils/getMd5FileName';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IRequest extends Request {
  files: {
    img: UploadedFile;
  };
}

type TGetAllRequest = {
  brandId?: number;
  typeId?: number;
  limit?: number;
  page?: number;
};

type TQueryParams = {
  brandId?: number;
  typeId?: number;
};

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = (req as IRequest).files || null;

      if (img) {
        const fileName = getMd5FileName(img);
        img.mv(path.resolve(__dirname, '../../static', fileName));

        const device = await Device.create({ name, price, brandId, typeId, img: fileName });
        return res.json(device);
      }
    } catch (err) {
      next(ApiError.badRequest(err as Error));
    }

    return res.status(404).json({
      message: 'Error: Data violates a unique constraint',
      error: 'Could not create device',
    });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const DEVICES_ON_PAGE = 10;
    const { brandId, typeId, limit = DEVICES_ON_PAGE, page = 1 }: TGetAllRequest = req.query;
    const offset = page * limit - limit;

    const queryParams: TQueryParams = {};
    if (brandId) queryParams.brandId = brandId;
    if (typeId) queryParams.typeId = typeId;

    const devices = await Device.findAndCountAll({ where: queryParams, limit, offset });

    return res.json(devices);
  }

  async getOne(req: Request, res: Response): Promise<void> {}
}

export default DeviceController;
