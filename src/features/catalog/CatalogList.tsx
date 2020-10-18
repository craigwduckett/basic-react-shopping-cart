import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import numbro from 'numbro';
import { RootState } from '../../app/store';

import { addToCart, fetchProducts } from './catalogSlice';

import { Cart } from './Cart';

import styles from './CatalogList.module.css';

export const CatalogList = () => {
  const products = useSelector((state: RootState) => state.catalog.products);
  const cartItems = useSelector((state: RootState) => state.catalog.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderedProducts = products.map((product) => (
    <div className={styles.items} key={product.name}>
      <h3>{product.name}</h3>
      <h5>{numbro(product.price).formatCurrency({ mantissa: 2 })}</h5>
      <button
        type="button"
        onClick={() => {
          dispatch(addToCart(product));
        }}
      >
        Add to Cart
      </button>
    </div>
  ));

  return (
    <div className={styles.catalog}>
      <div className={styles.products}>
        <h2>Products</h2>
        <div className={styles.productItems}>{renderedProducts}</div>
      </div>
      <Cart items={cartItems}/>
    </div>
  );
};
