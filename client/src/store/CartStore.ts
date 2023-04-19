import { makeAutoObservable } from 'mobx';

import { TDeviceData } from './types';

type TDeviceId = number;

class CartStore {
  private _userCart: Map<TDeviceId, TDeviceData>;
  totalPrice: number;

  constructor() {
    this._userCart = this.initCartFromLocalStorage();
    this.totalPrice = this.getTotalPrice();

    makeAutoObservable(this);
  }

  addDeviceToCart(deviceId: number, price: number): void {
    const devicesInCart = this._userCart.get(deviceId) || null;
    const newCount = devicesInCart?.count ? devicesInCart.count + 1 : 1;

    if (devicesInCart) {
      this._userCart.set(deviceId, { count: newCount, totalPrice: price * newCount });
    } else {
      this._userCart.set(deviceId, { count: 1, totalPrice: price });
    }

    this.totalPrice = this.getTotalPrice();
  }

  removeDeviceFromCart(deviceId: number, price: number): void {
    const devicesInCart = this._userCart.get(deviceId) || null;
    const newCount = devicesInCart?.count ? devicesInCart.count - 1 : 0;

    if (devicesInCart?.count && devicesInCart?.count > 1) {
      this._userCart.set(deviceId, { count: newCount, totalPrice: price * newCount });
    } else {
      this._userCart.delete(deviceId);
    }

    this.totalPrice = this.getTotalPrice();
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

  private getTotalPrice() {
    return Array.from(this._userCart).reduce(
      (acc, deviceData) => deviceData[1].totalPrice + acc,
      0,
    );
  }
}

export default CartStore;
