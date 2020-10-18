import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import '@testing-library/jest-dom/extend-expect';
import { Cart } from './Cart';

describe('Cart tests', () => {
  const items = [
    {
      name: 'Sledgehammer',
      price: 125.75,
      quantity: 1,
      lineTotal: 125.75
    },
  ];
  it('Section shows the first cart item name', () => {
    const CartComponentWithItem = render(
      <Provider store={store}>
        <Cart items={items} />
      </Provider>
    );
    const { getByTestId } = CartComponentWithItem;
    const itemName = getByTestId('cart-item-0');
    expect(itemName).toHaveTextContent(items[0].name);
  });
});
