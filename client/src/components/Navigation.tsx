import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { Context } from '../index';
import { SHOP_ROUTE } from '../utils/constants';

const Navigation = observer(() => {
  const { user } = useContext(Context);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to={SHOP_ROUTE} style={{ color: 'white' }}>
          BuyDevice
        </NavLink>

        {user.isAuth ? (
          <Nav style={{ color: 'white' }}>
            <Button variant="outline-light">Admin panel</Button>
            <Button variant="outline-light" className="ms-2" onClick={() => user.setIsAuth(false)}>
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