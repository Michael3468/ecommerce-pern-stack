import { makeAutoObservable } from 'mobx';

import { IBrand, IDevice, IType } from './types';

class DeviceStore {
  private _types: IType[];
  private _brands: IBrand[];
  private _devices: IDevice[];
  private _selectedType: IType;
  private _selectedBrand: IBrand;
  private _page: number;
  private _totalCount: number;
  private _limit: number;

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

    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;

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
    this.setPage(1);
  }

  setSelectedBrand(brand: IBrand) {
    this._selectedBrand = brand;
    this.setPage(1);
  }

  setPage(page: number) {
    this._page = page;
  }

  setTotalCount(count: number) {
    this._totalCount = count;
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

  get page(): number {
    return this._page;
  }

  get totalCount(): number {
    return this._totalCount;
  }

  get limit(): number {
    return this._limit;
  }
}

export default DeviceStore;
