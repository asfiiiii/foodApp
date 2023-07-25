import React, { useState, useEffect } from "react";
import classes from "./AvailableMeal.module.css";
import Card from "../Ui/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeal() {
  const [meals, setMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(
        "https://foodapp-c0280-default-rtdb.firebaseio.com/meal.json"
      );
      const data = await response.json();

      const mealData = [];

      for (const key in data) {
        mealData.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
        });
      }

      setMeal(mealData);
      setIsLoading(false);
    }

    fetchMeals().catch((error) => {
      setError(error.message);
    });
  }, []);

  const mealList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        {error && !isLoading && <p className={classes.isLoading}>{error}</p>}
        {isLoading && !error && <p className={classes.isLoading}>Loading...</p>}
        {!isLoading && !error && <ul>{mealList}</ul>}
      </Card>
    </section>
  );
}

export default AvailableMeal;
