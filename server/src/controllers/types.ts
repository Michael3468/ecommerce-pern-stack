import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';

interface IDeviceControllerCreateRequest extends Request {
  files: {
    img: UploadedFile;
  };
}

interface IUserControllerCheckRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

type TDeviceControllerGetAllRequest = {
  brandId?: number;
  typeId?: number;
  limit?: number;
  page?: number;
};

type TDeviceControllerQueryParams = {
  brandId?: number;
  typeId?: number;
};

export {
  IDeviceControllerCreateRequest,
  IUserControllerCheckRequest,
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
};
