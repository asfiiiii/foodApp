import React from "react";

const cart_context = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
});

export default cart_context;
