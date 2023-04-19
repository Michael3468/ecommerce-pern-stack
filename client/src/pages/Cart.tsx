import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import styles from '../assets/styles/common.module.css';
import CartItem from '../components/CartItem';
import { StoreContext } from '../index';

const Cart = observer(() => {
  const { cartStore } = useContext(StoreContext);

  return (
    <Container>
      {Array.from(cartStore.userCart).map((item) => (
        <CartItem key={item[0]} deviceId={item[0]} deviceData={item[1]} />
      ))}

      <div className="mt-3">
        <h3 className={`fw-bold ${styles.text_shadow}`}>
          {`Items (${Array.from(cartStore.userCart).reduce((acc, dev) => dev[1].count + acc, 0)})`}
        </h3>
        <h4 className={`fw-bold ${styles.text_shadow}`}>{`Total: ${cartStore.totalPrice} ₽`}</h4>
      </div>
    </Container>
  );
});

export default Cart;
