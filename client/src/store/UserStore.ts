import { makeAutoObservable } from 'mobx';

import { USER_ROLE } from '../constants';

type TUserRole = typeof USER_ROLE.ADMIN | typeof USER_ROLE.USER;

// TODO: move export interface ot types
export interface IUser {
  id: number;
  email: string;
  password: string;
  role: TUserRole;
}

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
