/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import ApiError from '../error/ApiError';
import { Device, DeviceInfo } from '../models/models';
import {
  IDeviceInfoAttributes,
  IDeviceControllerRequest,
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
} from '../types';
import getMd5FileName from '../utils/getMd5FileName';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name, price, brandId, typeId } = req.body;
      let { info } = req.body;
      const { img } = (req as IDeviceControllerRequest).files || null;

      if (img) {
        const fileName = getMd5FileName(img);
        img.mv(path.resolve(__dirname, '../../static', fileName));

        const device = await Device.create({ name, price, brandId, typeId, img: fileName });

        if (info) {
          info = JSON.parse(info);
          info.forEach((i: IDeviceInfoAttributes) =>
            DeviceInfo.create({
              title: i.title,
              description: i.description,
              deviceId: device.id,
            }),
          );
        }

        return res.json(device);
      }
    } catch (err) {
      next(ApiError.badRequest('Could not create device', err as Error));
    }

    return res.status(404).json({
      message: 'Error: Data violates a unique constraint',
      error: 'Could not create device',
    });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const DEVICES_ON_PAGE = 10;
    const {
      brandId,
      typeId,
      limit = DEVICES_ON_PAGE,
      page = 1,
    }: TDeviceControllerGetAllRequest = req.query;
    const offset = page * limit - limit;

    const queryParams: TDeviceControllerQueryParams = {};
    if (brandId) queryParams.brandId = brandId;
    if (typeId) queryParams.typeId = typeId;

    const devices = await Device.findAndCountAll({ where: queryParams, limit, offset });

    return res.json(devices);
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      return res.json(device);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default DeviceController;
