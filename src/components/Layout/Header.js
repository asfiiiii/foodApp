import React, { Fragment } from "react";
import mealImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import CartButton from "./CartButton";

function Header(props) {
  return (
    <Fragment>
      <div className={classes.header}>
        <h1>Foodbar</h1>
        <CartButton visibile={props.visibility} />
      </div>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="hehe" />
      </div>
    </Fragment>
  );
}

export default Header;
