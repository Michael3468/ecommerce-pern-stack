import React from 'react';

import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Device from './pages/Device';
import Shop from './pages/Shop';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/constants';

type TRoutes = {
  path: string;
  Component: React.ComponentType;
}[];

const authRoutes: TRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: `${DEVICE_ROUTE}/:id`,
    Component: Device,
  },
];

export { authRoutes, publicRoutes };
