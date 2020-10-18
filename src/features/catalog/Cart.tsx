import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import numbro from 'numbro';
import { RootState } from '../../app/store';

import { CartItem, removeFromCart } from './catalogSlice';

export const Cart = (props: any) => {
  const total = useSelector((state: RootState) => state.catalog.total);

  const dispatch = useDispatch();
  const renderedCartItems = (
    <TableContainer component={Paper}>
      <Table className="table" size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Line Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((cartItem: CartItem) => (
            <TableRow key={cartItem.name} data-testid="cart-item-0">
              <TableCell>{cartItem.name}</TableCell>
              <TableCell align="right">
                {numbro(cartItem.price).formatCurrency({ mantissa: 2 })}
              </TableCell>
              <TableCell align="right">{cartItem.quantity}</TableCell>
              <TableCell align="right">
                {numbro(cartItem.lineTotal).formatCurrency({ mantissa: 2 })}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(removeFromCart(cartItem));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <strong>Total</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{numbro(total).formatCurrency({ mantissa: 2 })}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  let cartContent;

  if (props.items.length > 0) {
    cartContent = renderedCartItems;
  } else {
    cartContent = 'Your cart is empty! Please add some items.';
  }

  return (
    <div>
      <h2>Cart</h2>
      {cartContent}
    </div>
  );
};
