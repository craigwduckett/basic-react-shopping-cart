import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { setCartItems, setTotal } from './app/localStorage';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createServer } from "miragejs"

createServer({
  routes() {
    this.get("/api/products", () => [
      {
          "name": "Sledgehammer",
          "price": 125.75
      },
      {
          "name": "Axe",
          "price": 190.50
      },
      {
          "name": "Bandsaw",
          "price": 562.13
      }, {
          "name": "Chisel",
          "price": 12.9
      },
      {
          "name": "Hacksaw",
          "price": 18.45
      }
    ])
  },
})

store.subscribe(() => {
  setCartItems(store.getState().catalog.cartItems)
  setTotal(store.getState().catalog.total)
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
