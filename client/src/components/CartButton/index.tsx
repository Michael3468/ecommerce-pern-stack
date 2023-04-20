import { Button } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { ROUTE, mainTheme } from '../../constants';

const CartButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outline-light" className="ms-2 border-0" onClick={() => navigate(ROUTE.CART)}>
      <BsCart3 style={{ fontSize: mainTheme.navbarIcon.size }} />
    </Button>
  );
};

export default CartButton;
