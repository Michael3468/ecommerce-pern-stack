import { makeAutoObservable } from 'mobx';

import { IBrand, IDevice, IType } from './types';

class DeviceStore {
  private _types: IType[];
  private _brands: IBrand[];
  private _devices: IDevice[];
  private _selectedType: IType;
  private _selectedBrand: IBrand;

  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];

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
