import { Model } from 'sequelize';

export interface IDeviceAttributes {
  id: number;
  name: string;
  price: number;
  rating?: number;
  img?: string;
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
