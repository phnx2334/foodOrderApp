import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import { ICartItem } from "../../types/cartTypes";
import Checkout, { formData } from "../Checkout/Checkout";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

interface ICartProps {
  onClose: () => void;
}

const Cart: React.FC<ICartProps> = (props) => {
  const cartCtx = useContext(CartContext);
  const [hasOrdered, setHasOrdered] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addItemHandler = (item: ICartItem) => {
    cartCtx.addItem(item);
  };

  const removeItemHandler = (id: string) => {
    console.log("the handler got executed");
    cartCtx.removeItem(id);
  };

  const onConfirmHandler = (enteredData: formData) => {
    fetch("https://reacttest-1ced5-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: enteredData,
        orderedItems: cartCtx.items,
      }),
    });
  };

  console.log("cart items has", cartCtx.items);
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            amount={item.amount}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={() => setHasOrdered(true)}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {hasOrdered && (
        <Checkout onConfirm={onConfirmHandler} onCancel={props.onClose} />
      )}
      {!hasOrdered && modalActions}
    </Modal>
  );
};

export default Cart;
