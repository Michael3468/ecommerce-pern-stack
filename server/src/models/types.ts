import { Model } from 'sequelize';

interface IUserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
}
interface IUser extends IUserAttributes, Model {}

interface IBasketAttributes {
  id: number;
}

interface IBasket extends IBasketAttributes, Model {}

interface IBasketDeviceAttributes {
  id: number;
}

interface IBasketDevice extends IBasketAttributes, Model {}

interface ITypeAttributes {
  id: number;
  name: string;
}

interface IType extends ITypeAttributes, Model {}

interface IBrandAttributes {
  id: number;
  name: string;
}

interface IBrand extends IBrandAttributes, Model {}

interface IRatingAttributes {
  id: number;
  rate: number;
}

interface IRating extends IRatingAttributes, Model {}

interface IDeviceAttributes {
  id: number;
  name: string;
  price: number;
  rating?: number;
  img?: string;
  brandId?: number;
  typeId?: number;
}

interface IDevice extends IDeviceAttributes, Model {}

interface IDeviceInfoAttributes {
  id: number;
  title: string;
  description: string;
}

interface IDeviceInfo extends IDeviceInfoAttributes, Model {}

interface ITypeBrandAttributes {
  id: number;
}

interface ITypeBrand extends ITypeAttributes, Model {}

export {
  IUser,
  IUserAttributes,
  IBasket,
  IBasketAttributes,
  IBasketDevice,
  IBasketDeviceAttributes,
  IType,
  ITypeAttributes,
  IBrand,
  IBrandAttributes,
  IRating,
  IRatingAttributes,
  IDevice,
  IDeviceAttributes,
  IDeviceInfo,
  IDeviceInfoAttributes,
  ITypeBrand,
  ITypeBrandAttributes,
};
