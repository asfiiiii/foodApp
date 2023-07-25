import React, { useContext, useState } from "react";
import animation from "./animation";
import Lottie from "lottie-react";
import classes from "./Cart.module.css";
import Modal from "../Ui/Modal";
import CartContext from "../Store/Cart-context";
import CartItem from "./CartItem";
import CheckOut from "./checkout";
function Cart(props) {
  const [checkout, setCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const [orderPlaced, setOrderPalced] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkOutHandler = () => {
    setCheckout(true);
  };

  const placeOrderHandler = async (dataSet) => {
    setIsPlacing(true);
    await fetch(
      "https://foodapp-c0280-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: dataSet,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsPlacing(false);
    setOrderPalced(true);
    cartCtx.emptyCart();
  };

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.hidding}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkOutHandler}>
          order
        </button>
      )}
    </div>
  );

  const modalMarkup = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <CheckOut onConfirm={placeOrderHandler} close={props.hidding} />
      )}
      {!checkout && cartActions}
    </React.Fragment>
  );
  const orderMarkup = (
    <React.Fragment>
      <div className={classes.container}>
        <p className={classes.placed}>Order placed Successfully</p>
        <Lottie loop={false} animationData={animation} />
      </div>
    </React.Fragment>
  );
  const orderPlacingMarkup = (
    <React.Fragment>
      <div className={classes.container}>
        <p>Order is being Placed</p>
        <div class={classes.dotSpinner}>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
          <div class={classes.dotSpinner__dot}></div>
        </div>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.hidding}>
      {!orderPlaced && !isPlacing && modalMarkup}
      {isPlacing && !orderPlaced && orderPlacingMarkup}
      {orderPlaced && !isPlacing && orderMarkup}
    </Modal>
  );
}

export default Cart;
