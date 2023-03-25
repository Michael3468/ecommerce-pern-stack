import { Model } from 'sequelize';

export interface IUserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface IUser extends IUserAttributes, Model {
  description?: string;
}

export interface IDeviceAttributes {
  id: number;
  name: string;
  price: number;
  rating?: number;
  img?: string;
  brandId?: number;
  typeId?: number;
}

export interface IDevice extends IDeviceAttributes, Model {
  description?: string;
}

export interface IDeviceInfoAttributes {
  id: number;
  title: string;
  description: string;
}

export interface IDeviceInfo extends IDeviceInfoAttributes, Model {}
