import { makeAutoObservable } from 'mobx';

// TODO common interfaces with backend??
type TUserRole = 'ADMIN' | 'USER';

interface IUser {
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

  setUser(user: IUser) {
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
