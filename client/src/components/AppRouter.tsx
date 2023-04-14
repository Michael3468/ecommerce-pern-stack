import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { StoreContext } from '../index';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {
  const { userStore } = useContext(StoreContext);
  return (
    <Routes>
      {userStore.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
});

export default AppRouter;
