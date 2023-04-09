import { $host, $authHost } from '.';
import { IBrand, IDevice, IType } from '../types';

const createType = async (type: { name: string }): Promise<IType> => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

const fetchTypes = async (): Promise<IType[]> => {
  const { data } = await $host.get('api/type');
  return data;
};

const createBrand = async (brand: { name: string }): Promise<IBrand> => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};

const fetchBrands = async (): Promise<IBrand[]> => {
  const { data } = await $host.get('api/brand');
  return data;
};

const createDevice = async (device: FormData): Promise<IDevice> => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

const fetchDevices = async (): Promise<IDevice[]> => {
  const { data } = await $host.get('api/device');
  return data.rows;
};

const fetchOneDevice = async (id: number): Promise<IDevice> => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};

export {
  createType,
  fetchTypes,
  createBrand,
  fetchBrands,
  createDevice,
  fetchDevices,
  fetchOneDevice,
};
