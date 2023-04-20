import React from 'react';

import { ROUTE } from './constants';
import { Admin, Auth, Cart, Device, Shop } from './pages';

type TRoute = {
  path: string;
  Component: React.ComponentType;
};

const authRoutes: TRoute[] = [
  {
    path: ROUTE.ADMIN,
    Component: Admin,
  },
];

const publicRoutes: TRoute[] = [
  {
    path: ROUTE.CART,
    Component: Cart,
  },
  {
    path: ROUTE.SHOP,
    Component: Shop,
  },
  {
    path: ROUTE.LOGIN,
    Component: Auth,
  },
  {
    path: ROUTE.REGISTRATION,
    Component: Auth,
  },
  {
    path: `${ROUTE.DEVICE}/:id`,
    Component: Device,
  },
];

export { authRoutes, publicRoutes };
