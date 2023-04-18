import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import { USER_ROLE, ROUTE } from '../constants';
import { StoreContext } from '../index';
import CartButton from './CartButton';

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
            <CartButton />

            <Button variant="outline-light" className="ms-2" onClick={handleLogOutButton}>
              Log Out
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: 'white' }}>
            <CartButton />

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
