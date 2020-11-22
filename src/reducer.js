const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...item, amount: item.amount + 1 };
          }
          if (action.payload.type === 'dec') {
            return { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      (catrTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        catrTotal.amount += amount;
        catrTotal.total += itemTotal;
        return catrTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = +total.toFixed(2);
    return { ...state, total, amount };
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }

  throw new Error('no matching action type');
};

export default reducer;
