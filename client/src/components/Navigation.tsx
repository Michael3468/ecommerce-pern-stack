import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';

import { USER_ROLE, ROUTE } from '../constants';
import { StoreContext } from '../index';

const Navigation = observer(() => {
  const { userStore } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    userStore.setUser(null);
    userStore.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {/* TODO: add color 'white' to 'constants' theme */}
        <NavLink to={ROUTE.SHOP} style={{ color: 'white' }}>
          BuyDevice
        </NavLink>

        {userStore.isAuth ? (
          <Nav style={{ color: 'white' }}>
            {userStore.user?.role === USER_ROLE.ADMIN && (
              <Button variant="outline-light" onClick={() => navigate(ROUTE.ADMIN)}>
                Admin Panel
              </Button>
            )}
            {/* TODO: add span with number */}
            <BsCart3
              className="mt-auto mb-auto me-3"
              style={{ fontSize: '36px', cursor: 'pointer' }}
              onClick={() => navigate(ROUTE.CART)}
            />
            <Button variant="outline-light" className="ms-2" onClick={handleLogOutButton}>
              Log Out
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: 'white' }}>
            <Button variant="outline-light" onClick={() => navigate(ROUTE.LOGIN)}>
              Log In
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Navigation;
