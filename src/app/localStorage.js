export const getCartItems = () => {
  try {
    const serializedCartItems = localStorage.getItem('cartItems');
    if (serializedCartItems === null) {
      return [];
    }
    return JSON.parse(serializedCartItems);
  } catch (err) {
    return undefined;
  }
};

export const setCartItems = (cartItems) => {
  try {
    const serializedCartItems = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', serializedCartItems);
  } catch (err) {
    // ignore for now but best to do something if real app
  }
};

export const getTotal = () => {
  try {
    if (localStorage.getItem('total') === null) {
      return 0;
    }
    return parseFloat(localStorage.getItem('total'));
  } catch (err) {
    return 0;
  }
};

export const setTotal = (total) => {
  try {
    localStorage.setItem('total', total);
  } catch (err) {
    // ignore for now but best to do something if real app
  }
};
