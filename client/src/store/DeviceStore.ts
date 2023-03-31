// TODO common interfaces
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

class DeviceStore {
  private _types: IType[];
  private _brands: IBrand[];
  private _devices: IDevice[];

  constructor() {
    this._types = [
      { id: 1, name: 'Холодильники' },
      { id: 2, name: 'Смартфоны' },
    ];

    this._brands = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Apple' },
    ];

    // TODO check images from internet
    this._devices = [
      { id: 1, name: 'Iphone 12 Pro', price: 25001, rating: 1, img: 'img1.jpg' },
      { id: 2, name: 'Iphone 12 Pro', price: 25002, rating: 2, img: 'img2.jpg' },
      { id: 3, name: 'Iphone 12 Pro', price: 25003, rating: 3, img: 'img3.jpg' },
      { id: 4, name: 'Iphone 12 Pro', price: 25004, rating: 4, img: 'img4.jpg' },
    ];
  }

  setTypes(types: IType[]) {
    this._types = types;
  }

  setBrands(brands: IBrand[]) {
    this._brands = brands;
  }

  setDevices(devices: IDevice[]) {
    this._devices = devices;
  }

  get types(): IType[] {
    return this._types;
  }

  get brands(): IBrand[] {
    return this._brands;
  }

  get devices(): IDevice[] {
    return this._devices;
  }
}

export default DeviceStore;
