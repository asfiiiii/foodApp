import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../Ui/INput";
function MealItenForm(props) {
  const amountInputRef = useRef();

  const [isAmountValid, setAmountValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmountNumber > 5 ||
      enteredAmountNumber < 1 ||
      enteredAmount.trim().length === 0
    ) {
      setAmountValid(false);
      return;
    }

    props.AddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+Add</button>
      {!isAmountValid && <p>Please enter a valid amount</p>}
    </form>
  );
}
export default MealItenForm;
