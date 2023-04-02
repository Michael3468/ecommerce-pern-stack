interface IType {
  id: number;
  name: string;
}

interface IBrand {
  id: number;
  name: string;
}

interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
}

export type { IType, IBrand, IDevice };
