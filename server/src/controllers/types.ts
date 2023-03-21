import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';

export interface IDeviceControllerRequest extends Request {
  files: {
    img: UploadedFile;
  };
}

export type TDeviceControllerGetAllRequest = {
  brandId?: number;
  typeId?: number;
  limit?: number;
  page?: number;
};

export type TDeviceControllerQueryParams = {
  brandId?: number;
  typeId?: number;
};
