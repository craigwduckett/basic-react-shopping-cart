import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems, getTotal } from '../../app/localStorage';

export type Product = {
  name: string;
  price: number;
};

export type CartItem = Product & { quantity: number; lineTotal: number };

export type ShoppingCart = {
  [key: string]: CartItem;
};

interface CatalogState {
  products: Product[];
  cartItems: CartItem[];
  total: number;
  getProductsStatus: string;
  getProductsError: any;
}

const initialState: CatalogState = {
  products: [],
  cartItems: getCartItems(),
  total: getTotal(),
  getProductsStatus: 'pending',
  getProductsError: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/api/products')
      .then((response) => response.json())
      .then((json) => json);
    return response;
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addToCart: {
      reducer(state: CatalogState, action: PayloadAction<any>) {
        const existingCartItem = state.cartItems.find(
          (item) => item.name === action.payload.name
        );
        if (existingCartItem) {
          existingCartItem.quantity++;
          existingCartItem.lineTotal =
            existingCartItem.lineTotal + existingCartItem.price;
        } else {
          state.cartItems.push(action.payload);
        }
        state.total = state.cartItems.reduce(
          (total, item) => total + item.lineTotal,
          0
        );
        //console.log(action.payload)
      },
      prepare(product: Product) {
        return {
          payload: {
            name: product.name,
            price: product.price,
            quantity: 1,
            lineTotal: product.price,
          },
        };
      },
    },
    removeFromCart(state: CatalogState, action: PayloadAction<any>) {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.name !== action.payload.name
      );

      state.cartItems = updatedCartItems;
      state.total = state.cartItems.reduce(
        (total, item) => total + item.lineTotal,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = state.products.concat(action.payload);
    });
  },
});

export const { addToCart, removeFromCart } = catalogSlice.actions;

export default catalogSlice.reducer;
