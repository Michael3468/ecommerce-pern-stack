import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Context } from '../index';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, headerHeight } from '../utils/constants';

const Auth = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleAuthButtonClick = (isLoginStatus: boolean) => {
    if (isLoginStatus) {
      // Login
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } else {
      // Register
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - headerHeight }}
    >
      <Card style={{ width: '320px', background: 'rgb(191, 191, 191)' }} className="p-3">
        <h2 className="ms-auto me-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>

        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" type="email" placeholder="enter your email..." />
          <Form.Control className="mt-3" type="password" placeholder="enter your password..." />

          <Row className="d-flex justify-content-between align-items-center pl-3 pr-3 mt-3">
            <Col sm={7}>
              {isLogin ? (
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
              <Button
                className="ms-auto"
                variant="outline-success"
                onClick={() => handleAuthButtonClick(isLogin)}
              >
                {isLogin ? 'Log In' : 'Register'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
