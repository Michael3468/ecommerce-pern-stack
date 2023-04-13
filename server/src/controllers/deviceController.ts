import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

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
import getDirName from '../utils/getDirName';
import getMd5FileName from '../utils/getMd5FileName';

const __dirname = getDirName(import.meta.url);

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, price, brandId, typeId }: IDeviceAttributes = req.body;
      let { info } = req.body;

      let img;
      if ((req as IDeviceControllerCreateRequest).files) {
        img = (req as IDeviceControllerCreateRequest).files.img;
      }

      let device: IDevice;
      if (img) {
        const fileName = getMd5FileName(img);
        img.mv(path.resolve(__dirname, '../static', fileName));

        device = await Device.create({ name, price, brandId, typeId, img: fileName });
      } else {
        /**
         * check if 'no-image.png' exist in 'static/ dir
         * if not copy it
         */
        const destinationPath = path.resolve(__dirname, '../static');
        const imageName = 'no-image.png';

        fs.access(`${destinationPath}/${imageName}`, fs.constants.F_OK, (error) => {
          if (error) {
            console.log(error);

            const sourcePath = path.resolve(__dirname, '../assets/images', imageName);
            fs.copyFile(sourcePath, `${destinationPath}/${imageName}`, (err) => {
              if (err) throw Error;
              console.log('File was copied successfully');
            });
          }
        });

        device = await Device.create({ name, price, brandId, typeId, img: imageName });
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
      return next(ApiError.badRequest({ error: error as Error }));
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
      return next(ApiError.internal({ error: error as Error }));
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
      return next(ApiError.internal({ error: error as Error }));
    }
  }
}

export default DeviceController;
