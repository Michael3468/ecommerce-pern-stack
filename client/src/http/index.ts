import axios, { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (
  config: InternalAxiosRequestConfig<AxiosRequestConfig>,
): InternalAxiosRequestConfig<AxiosRequestConfig> => {
  const configWithInterceptor = { ...config };

  if (localStorage.getItem('token')) {
    configWithInterceptor.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return configWithInterceptor;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
