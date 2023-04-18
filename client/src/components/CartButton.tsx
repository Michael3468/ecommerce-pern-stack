import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { ROUTE, mainTheme } from '../constants';

const CartButton = () => {
  const navigate = useNavigate();

  return (
    // TODO: add span with number
    <BsCart3
      className="mt-auto mb-auto me-3"
      style={{ fontSize: mainTheme.cartIcon.size, cursor: 'pointer' }}
      onClick={() => navigate(ROUTE.CART)}
    />
  );
};

export default CartButton;
