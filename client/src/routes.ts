import React from 'react';

import { ROUTE } from './constants';
import { Admin, Auth, Basket, Device, Shop } from './pages';

type TRoute = {
  path: string;
  Component: React.ComponentType;
};

const authRoutes: TRoute[] = [
  {
    path: ROUTE.ADMIN,
    Component: Admin,
  },
  {
    path: ROUTE.BASKET,
    Component: Basket,
  },
];

const publicRoutes: TRoute[] = [
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
