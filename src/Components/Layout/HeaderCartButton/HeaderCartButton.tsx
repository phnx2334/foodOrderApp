import React, { useContext } from "react";
import CartIcon from "./CartIcon";
import CartContext from "../../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

interface IHeaderCartButtonProps {
  onClick?: () => void;
}

const HeaderCartButton: React.FC<IHeaderCartButtonProps> = (props) => {
  const cartCtx = useContext(CartContext);

  

  const cartItemsNumber = cartCtx.items.reduce((curr, item) => {


    curr = curr + item.amount;
    return curr;
  }, 0);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
