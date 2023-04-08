import jwtDecode from 'jwt-decode';

import { $authHost, $host } from '.';
import { IUser } from '../types';

const registration = async (email: string, password: string): Promise<IUser> => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const login = async (email: string, password: string): Promise<IUser> => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const check = async (): Promise<IUser> => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export { registration, login, check };
