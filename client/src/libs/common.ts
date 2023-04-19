import CartStore from '../store/CartStore';

const saveCartToLocalStorage = (cartStore: CartStore) => {
  const stringifiedCart = JSON.stringify(Array.from(cartStore.userCart.entries()));
  localStorage.setItem('cart', stringifiedCart);
};

// eslint-disable-next-line import/prefer-default-export
export { saveCartToLocalStorage };
