import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MelaItem/MealItem";
import style from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const result = await fetch(
        "https://fb-crud-a6a92.firebaseio.com/meals.json"
      );
      if (!result.ok) {
        throw Error("Something was wrong");
      }
      const data = await result.json();
      const mealsIds = Object.keys(data);
      const mappedData = [];

      for (const key of mealsIds) {
        mappedData.push({ id: key, ...data[key] });
      }

      setMeals(mappedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={style.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={style.mealsHasError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);

  return (
    <section className={style.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
