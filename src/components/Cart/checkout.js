import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
function CheckOut(props) {
  const nameRef = useRef();
  const addressRef = useRef();
  const postalRef = useRef();

  const [inputFormValidity, setInputFormValidity] = useState({
    name: true,
    address: true,
    postal_code: true,
  });

  const validInput = (value) => {
    if (value.trim() === "") return false;
    else return true;
  };
  const validPostalCode = (value) => {
    if (value.trim().length === 5) return true;
    else return false;
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const postal_code = postalRef.current.value;

    const validName = validInput(name);
    const validAddress = validInput(address);
    const validPostal = validPostalCode(postal_code);

    setInputFormValidity({
      name: validName,
      address: validAddress,
      postal_code: validPostal,
    });

    const data = {
      name,
      address,
      postal_code,
    };
    const formIsValid = validName && validAddress && validPostal;

    if (formIsValid) {
      props.onConfirm(data);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" ref={nameRef} />
        {!inputFormValidity.name && (
          <p className={classes.err}>Enter valid Name please.</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Address: </label>
        <input type="text" name="adress" ref={addressRef} />
        {!inputFormValidity.address && (
          <p className={classes.err}>Enter valid Address please.</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Postal Code: </label>
        <input type="text" name="name" ref={postalRef} />
        {!inputFormValidity.postal_code && (
          <p className={classes.err}>Enter valid Postal Code please.</p>
        )}
      </div>
      <div className={classes.btns}>
        <button type="button" onClick={props.close}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
}

export default CheckOut;
