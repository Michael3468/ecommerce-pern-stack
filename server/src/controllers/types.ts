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

type TBrandControllerCreateRequest = {
  name: string;
};

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

type TTypeControllerCreateRequest = {
  name: string;
};

type IUserControllerRegistrationRequest = {
  email: string,
  role: string,
  password: string,
};

export {
  IDeviceControllerCreateRequest,
  IUserControllerCheckRequest,
  TBrandControllerCreateRequest,
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
  TTypeControllerCreateRequest,
  IUserControllerRegistrationRequest,
};
