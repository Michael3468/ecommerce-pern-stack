import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import CartItem from '../components/CartItem';
import { StoreContext } from '../index';

const Cart = () => {
  const { cartStore } = useContext(StoreContext);

  return (
    <Container>
      {Array.from(cartStore.userCart).map((item) => (
        <CartItem key={item[0]} deviceId={item[0]} deviceData={item[1]} />
      ))}
    </Container>
  );
};

export default Cart;
