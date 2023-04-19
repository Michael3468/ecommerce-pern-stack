import { makeAutoObservable } from 'mobx';

import { TDeviceData } from './types';

type TDeviceId = number;

class CartStore {
  private _userCart: Map<TDeviceId, TDeviceData>;

  constructor() {
    this._userCart = this.initCartFromLocalStorage();

    makeAutoObservable(this);
  }

  addDeviceToCart(deviceId: number, price: number): Map<TDeviceId, TDeviceData> {
    const devicesInCart = this._userCart.get(deviceId) || null;
    const newCount = devicesInCart?.count ? devicesInCart.count + 1 : 1;

    return devicesInCart
      ? this._userCart.set(deviceId, { count: newCount, totalPrice: price * newCount })
      : this._userCart.set(deviceId, { count: 1, totalPrice: price });
  }

  removeDeviceFromCart(deviceId: number, price: number): Map<TDeviceId, TDeviceData> {
    const devicesInCart = this._userCart.get(deviceId) || null;
    const newCount = devicesInCart?.count ? devicesInCart.count - 1 : 0;

    if (devicesInCart?.count && devicesInCart?.count > 1) {
      return this._userCart.set(deviceId, { count: newCount, totalPrice: price * newCount });
    }

    this._userCart.delete(deviceId);
    return this._userCart;
  }

  saveCartToLocalStorage(): void {
    const stringifiedCart = JSON.stringify(Array.from(this._userCart.entries()));
    localStorage.setItem('cart', stringifiedCart);
  }

  get userCart() {
    return this._userCart;
  }

  // eslint-disable-next-line class-methods-use-this
  private initCartFromLocalStorage(): Map<TDeviceId, TDeviceData> {
    const localStorageCart = localStorage.getItem('cart');
    const userCartStore = localStorageCart
      ? new Map<TDeviceId, TDeviceData>(JSON.parse(localStorageCart))
      : new Map<TDeviceId, TDeviceData>();
    return userCartStore;
  }
}

export default CartStore;
