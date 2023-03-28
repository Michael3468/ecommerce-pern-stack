/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import ApiError from '../error/ApiError';
import { Device, DeviceInfo } from '../models/models';
import {
  IDeviceInfoAttributes,
  IDeviceControllerCreateRequest,
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
  IDeviceAttributes,
  IDevice,
} from '../types';
import getMd5FileName from '../utils/getMd5FileName';

// TODO: move to utils?
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, price, brandId, typeId }: IDeviceAttributes = req.body;
      let { info } = req.body;
      const { img } = (req as IDeviceControllerCreateRequest).files || null;

      let device: IDevice;
      if (img) {
        const fileName = getMd5FileName(img);
        img.mv(path.resolve(__dirname, '../../static', fileName));

        device = await Device.create({ name, price, brandId, typeId, img: fileName });
      } else {
        // TODO: 'add default-image.jpg'
        const defaultImage = path.resolve(__dirname, '../../static', 'default-image.jpg');
        device = await Device.create({ name, price, brandId, typeId, img: defaultImage });
      }

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
    } catch (error) {
      return next(ApiError.badRequest('Could not create device', error as Error));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
    } catch (error) {
      return next(ApiError.internal('Could not get all devices', error as Error));
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
    } catch (error) {
      return next(ApiError.internal('Internal server error', error as Error));
    }
  }
}

export default DeviceController;
