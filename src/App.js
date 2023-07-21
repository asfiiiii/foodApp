import Header from "./components/Layout/Header";
import React, { useState } from "react";
import Meal from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";

function App() {
  const [isShown, setIsShown] = useState(false);

  const showCartHandler = () => {
    setIsShown(true);
  };
  const hideCartHandler = () => {
    setIsShown(false);
  };

  return (
    <CartProvider>
      {isShown && <Cart hidding={hideCartHandler} />}
      <Header visibility={showCartHandler} />
      <Meal />
    </CartProvider>
  );
}

export default App;
