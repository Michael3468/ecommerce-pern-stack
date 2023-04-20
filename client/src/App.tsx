import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import { StoreContext } from '.';
import { AppRouter, Navigation } from './components';
import { check } from './http/userAPI';

const App = observer(() => {
  const { userStore } = useContext(StoreContext);
  const [loading, setLoading] = useState<boolean>(true);

  // TODO: change 'data' to something more specific (everywhere)
  useEffect(() => {
    check()
      .then((data) => {
        userStore.setUser(data);
        userStore.setIsAuth(true);
      })
      .catch((error) => {
        const { message } = error.response.data;
        // eslint-disable-next-line no-console
        console.log(message);

        if (message === 'jwt expired') {
          localStorage.removeItem('token');
        }
      })
      .finally(() => setLoading(false));
  }, [userStore]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navigation />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
