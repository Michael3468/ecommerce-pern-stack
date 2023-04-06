import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { Context } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants';

const Navigation = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={SHOP_ROUTE} style={{ color: 'white' }}>
          BuyDevice
        </NavLink>

        {user.isAuth ? (
          <Nav style={{ color: 'white' }}>
            <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>
              Admin panel
            </Button>
            <Button variant="outline-light" className="ms-2" onClick={() => navigate(LOGIN_ROUTE)}>
              Log out
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: 'white' }}>
            <Button variant="outline-light" onClick={() => user.setIsAuth(true)}>
              Log in
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Navigation;
