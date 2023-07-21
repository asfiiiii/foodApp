import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./CartButton.module.css";
import { BsCart4 } from "react-icons/bs";
import CartContext from "../Store/Cart-context";
function CartButton(props) {
  const cartCtx = useContext(CartContext);

  const [highlited, setHighlited] = useState(false);
  const NumberOfItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${highlited ? classes.bump : ""}`;
  const { items } = cartCtx;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    } else {
      setHighlited(true);
      const timer = setTimeout(() => {
        setHighlited(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cartCtx.items.length, items]);

  return (
    <Fragment>
      <button className={btnClasses} onClick={props.visibile}>
        <span className={classes.icon}>
          <BsCart4 />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{NumberOfItems}</span>
      </button>
    </Fragment>
  );
}

export default CartButton;
