import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "../MealItemForm/MealItemForm";
import styles from "./MealItem.module.css";

interface IMealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

const MealItem: React.FC<IMealItemProps> = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      description:props.description,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;
