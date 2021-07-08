import { useRef, useState } from "react";
import Input from "../../UI/Input";
import style from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      !enteredAmount.trim().length ||
      (enteredAmountNumber < 1 && enteredAmountNumber > 5)
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        labe="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {amountIsValid}
    </form>
  );
};

export default MealItemForm;
