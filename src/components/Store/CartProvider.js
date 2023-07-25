import React, { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const UpadatedAmount =
      state.totalAmount + action.items.price * action.items.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.items.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItem;
    let updatedItems;
    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.items.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.items);
    }

    return {
      items: updatedItems,
      totalAmount: UpadatedAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "EMPTY_CART") {
    return defaultState;
  }
};
function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addCartItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      items: item,
    });
  };

  const removeCartItemHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const emptyCartHandler = () => {
    dispatchCartAction({ type: "EMPTY_CART" });
  };

  // Define the context value as an object
  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler, // Assign the function reference
    removeItem: removeCartItemHandler, // Assign the function reference
    emptyCart: emptyCartHandler, // Assign the function reference
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
