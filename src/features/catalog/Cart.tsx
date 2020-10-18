import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import numbro from 'numbro';
import { RootState } from '../../app/store';

import { removeFromCart } from './catalogSlice';

import styles from './Cart.module.css';

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.catalog.cartItems);
  const total = useSelector((state: RootState) => state.catalog.total);

  const dispatch = useDispatch();

  const renderedCartItems = cartItems.map((cartItem) => (
    <div
      className={styles.lineItem}
      key={cartItem.name}
      data-testid="cart-item-0"
    >
      <div>{cartItem.name}</div>
      <div>{cartItem.price}</div>
      <div>{cartItem.quantity}</div>
      <div>{numbro(cartItem.lineTotal).formatCurrency({ mantissa: 2 })}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            dispatch(removeFromCart(cartItem));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  ));

  let cartContent;

  if (renderedCartItems.length > 0) {
    cartContent = renderedCartItems;
  } else {
    cartContent = 'Your cart is empty! Please add some items.';
  }

  return (
      <div className={styles.cart}>
        <h2>Cart</h2>
        <div className={styles.cartItems}>{cartContent}</div>
        <div className={styles.cartTotal}>
          <strong>{numbro(total).formatCurrency({ mantissa: 2 })}</strong>
        </div>
      </div>
  );
};
