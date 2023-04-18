import { makeAutoObservable } from 'mobx';

type TDeviceId = number;
type TDeviceCount = number;

class CartStore {
  private _userCart: Map<TDeviceId, TDeviceCount>;

  constructor() {
    this._userCart = new Map();

    makeAutoObservable(this);
  }

  addDeviceToCart(deviceId: number): Map<TDeviceId, TDeviceCount> {
    const devicesInCart = this._userCart.get(deviceId) || 0;

    return devicesInCart
      ? this._userCart.set(deviceId, devicesInCart + 1)
      : this._userCart.set(deviceId, 1);
  }

  removeDeviceFromCart(deviceId: number): Map<TDeviceId, TDeviceCount> {
    const devicesInCart = this._userCart.get(deviceId) || 0;

    if (devicesInCart > 1) {
      return this._userCart.set(deviceId, devicesInCart - 1);
    }

    this._userCart.delete(deviceId);
    return this._userCart;
  }

  get userCart() {
    return this._userCart;
  }
}

export default CartStore;
