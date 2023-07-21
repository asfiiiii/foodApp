import React, { Fragment } from "react";
import MealSummary from "./MealsSummary";
import AvailableMeal from "./AvailableMeal";
function Meals() {
  return (
    <Fragment>
      <MealSummary />
      <AvailableMeal />
    </Fragment>
  );
}

export default Meals;
