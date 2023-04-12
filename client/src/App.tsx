import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import { Context } from '.';
import AppRouter from './components/AppRouter';
import Navigation from './components/Navigation';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);

  // TODO: change 'data' to something more specific (everywhere)
  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
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
  }, [user]);

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
