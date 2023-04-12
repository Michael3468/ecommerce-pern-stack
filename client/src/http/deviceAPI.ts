import { $host, $authHost } from '.';
import { IBrand, IDevice, IType } from '../types';

// TODO interfaces
interface IFetchDevicesParams {
  typeId?: number;
  brandId?: number;
  page?: number;
  limit?: number;
}

interface IDevices {
  count: number;
  rows: IDevice[];
}

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

const fetchOneBrand = async (id: number): Promise<IBrand> => {
  const { data } = await $host.get(`api/brand/${id}`);
  return data;
};

const createDevice = async (device: FormData): Promise<IDevice> => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

const fetchDevices = async ({
  typeId,
  brandId,
  page,
  limit = 5,
}: IFetchDevicesParams): Promise<IDevices> => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
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
  fetchOneBrand,
  createDevice,
  fetchDevices,
  fetchOneDevice,
};
