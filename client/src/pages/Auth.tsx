import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { login, registration } from '../http/userAPI';
import { Context } from '../index';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, headerHeight } from '../utils/constants';

const Auth = observer(() => {
  const location = useLocation();
  const isLoginRoute = location.pathname === LOGIN_ROUTE;
  const { userStore } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const click = async () => {
    try {
      const user = isLoginRoute
        ? await login(email, password)
        : await registration(email, password);

      userStore.setUser(user);
      userStore.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // eslint-disable-next-line no-alert
      alert((error as Error).message ?? 'An error ocurred');
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - headerHeight }}
    >
      <Card style={{ width: '320px', background: 'rgb(191, 191, 191)' }} className="p-3">
        <h2 className="ms-auto me-auto">{isLoginRoute ? 'Authorization' : 'Registration'}</h2>

        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email..."
          />
          <Form.Control
            className="mt-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password..."
          />

          <Row className="d-flex justify-content-between align-items-center pl-3 pr-3 mt-3">
            <Col sm={7}>
              {isLoginRoute ? (
                <div>
                  {'No account? '}
                  <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                </div>
              ) : (
                <div>
                  {'Have account? '}
                  <NavLink to={LOGIN_ROUTE}>Log In</NavLink>
                </div>
              )}
            </Col>

            <Col sm={5} className="d-flex">
              <Button className="ms-auto" variant="outline-success" onClick={click}>
                {isLoginRoute ? 'Log In' : 'Register'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
