import React, { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./MealItemForm.module.css";

interface IMealItemForm {
  id: string;
  onAddToCart:(amount:number)=>void
}

const MealItemForm: React.FC<IMealItemForm> = (props) => {
  const [isValid, setIsValid] = useState(true);

  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current!.value;

    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setIsValid(false);
      return;
    }

    props.onAddToCart(+enteredAmount)
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!isValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
