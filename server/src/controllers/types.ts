import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';

// TODO: rename IDeviceControllerRequest?
interface IDeviceControllerRequest extends Request {
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
  IDeviceControllerRequest,
  IUserControllerCheckRequest,
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
};
