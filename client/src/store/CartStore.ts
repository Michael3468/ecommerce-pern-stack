import { makeAutoObservable } from 'mobx';

import { IDevice } from './types';

type TDeviceCount = number;

class CartStore {
  private _userCart: Map<IDevice, TDeviceCount>;

  constructor() {
    this._userCart = new Map();

    makeAutoObservable(this);
  }

  addDeviceToCart(device: IDevice): Map<IDevice, TDeviceCount> {
    const deviceCount = this._userCart.get(device) || 0;

    return deviceCount > 0
      ? this._userCart.set(device, deviceCount + 1)
      : this._userCart.set(device, 1);
  }

  deleteDeviceFromCart(device: IDevice): Map<IDevice, TDeviceCount> {
    const deviceCount = this._userCart.get(device) || 0;

    if (deviceCount > 1) {
      return this._userCart.set(device, deviceCount - 1);
    }

    this._userCart.delete(device);
    return this._userCart;
  }

  get userCart() {
    return this._userCart;
  }
}

export default CartStore;
