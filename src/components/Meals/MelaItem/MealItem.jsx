import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import style from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      amount,
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
    });
  };

  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;