import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
// TODO: re-export stores from store/index.ts
import CartStore from './store/CartStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

interface IStoreContext {
  userStore: UserStore;
  deviceStore: DeviceStore;
  cartStore: CartStore;
}
// eslint-disable-next-line import/prefer-default-export
export const StoreContext = createContext<IStoreContext>({
  userStore: new UserStore(),
  deviceStore: new DeviceStore(),
  cartStore: new CartStore(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreContext.Provider
      value={{
        userStore: new UserStore(),
        deviceStore: new DeviceStore(),
        cartStore: new CartStore(),
      }}
    >
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
