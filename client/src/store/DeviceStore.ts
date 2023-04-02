import { makeAutoObservable } from 'mobx';

import { IBrand, IDevice, IType } from './types';

class DeviceStore {
  private _types: IType[];
  private _brands: IBrand[];
  private _devices: IDevice[];
  private _selectedType: IType;
  private _selectedBrand: IBrand;

  constructor() {
    this._types = [
      { id: 1, name: 'Холодильники' },
      { id: 2, name: 'Смартфоны' },
      { id: 3, name: 'Ноутбуки' },
      { id: 4, name: 'Телевизоры' },
    ];

    this._brands = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Apple' },
      { id: 3, name: 'Lenovo' },
      { id: 4, name: 'Aquarius' },
    ];

    // TODO check images from internet
    this._devices = [
      { id: 1, name: 'Iphone 12 Pro', price: 25001, rating: 1, img: '' },
      { id: 2, name: 'Iphone 12 Pro', price: 25002, rating: 2, img: '' },
      { id: 3, name: 'Iphone 12 Pro', price: 25003, rating: 3, img: '' },
      { id: 4, name: 'Iphone 12 Pro', price: 25004, rating: 4, img: '' },
      { id: 5, name: 'Iphone 12 Pro', price: 25003, rating: 3, img: '' },
      { id: 6, name: 'Iphone 12 Pro', price: 25004, rating: 4, img: '' },
      { id: 7, name: 'Iphone 12 Pro', price: 25003, rating: 3, img: '' },
      { id: 8, name: 'Iphone 12 Pro', price: 25004, rating: 4, img: '' },
    ];

    this._selectedType = {
      id: 0,
      name: '',
    };

    this._selectedBrand = {
      id: 0,
      name: '',
    };

    makeAutoObservable(this);
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

  setSelectedType(type: IType) {
    this._selectedType = type;
  }

  setSelectedBrand(brand: IBrand) {
    this._selectedBrand = brand;
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

  get selectedType(): IType {
    return this._selectedType;
  }

  get selectedBrand(): IBrand {
    return this._selectedBrand;
  }
}

export default DeviceStore;
