import React from 'react';

import { ROUTE } from './constants';
// TODO: reexport pages from pages/index.ts
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Device from './pages/Device';
import Shop from './pages/Shop';

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
