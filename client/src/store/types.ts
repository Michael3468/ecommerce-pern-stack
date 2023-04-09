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
}

export type { IType, IBrand, IDevice, IDeviceInfo };
