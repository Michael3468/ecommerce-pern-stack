import { USER_ROLE } from '../constants';

interface IType {
  id: number;
  name: string;
}

interface IBrand {
  id: number;
  name: string;
}

interface IDeviceInfo {
  id: number;
  title: string;
  description: string;
}
interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  info?: IDeviceInfo[];
  typeId: number;
  brandId: number;
  cartId: number;
}

type TUserRole = typeof USER_ROLE.ADMIN | typeof USER_ROLE.USER;

interface IUser {
  id: number;
  email: string;
  password: string;
  role: TUserRole;
}

type TDeviceData = {
  count: number;
  totalPrice: number;
};

export type { IType, IBrand, IDevice, IDeviceInfo, IUser, TUserRole, TDeviceData };
