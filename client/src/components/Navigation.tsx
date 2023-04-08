import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { Context } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants';

const Navigation = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    user.setUser(null);
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={SHOP_ROUTE} style={{ color: 'white' }}>
          BuyDevice
        </NavLink>

        {user.isAuth ? (
          <Nav style={{ color: 'white' }}>
            <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>
              Admin Panel
            </Button>
            <Button variant="outline-light" className="ms-2" onClick={handleLogOutButton}>
              Log Out
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: 'white' }}>
            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
              Log In
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Navigation;
