import { makeAutoObservable } from 'mobx';

import { IUser } from './types';

class UserStore {
  private _isAuth: boolean;
  private _user: IUser | null;

  constructor() {
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: IUser | null) {
    this._user = user;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get user(): IUser | null {
    return this._user;
  }
}

export default UserStore;
