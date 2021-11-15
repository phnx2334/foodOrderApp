import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import { ICartItem } from "../../../types/cartTypes";

const AvailableMeals = () => {
  const [meals, setMeals] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const getMeals = async () => {
    const response = await fetch(
      "https://reacttest-1ced5-default-rtdb.firebaseio.com/meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }
    const data = await response.json();

    const mealsArray = Object.keys(data).map((mealIndex) => {
      const meal = { ...data[mealIndex], id: mealIndex };
      return meal;
    });

    setMeals(mealsArray);
    setIsLoading(false);
  };

  useEffect(() => {
    getMeals().catch((e) => setHttpError(e.message));
  }, []);

  if (httpError) {
    return (
      <section className={styles.Error}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
