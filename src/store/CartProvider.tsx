import React, { useReducer } from "react";
import { ICartItem } from "../types/cartTypes";
import CartContext, { ICartContext } from "./cart-context";

interface ICartState {
  items: ICartItem[];
  totalAmount: number;
}

interface ICartAddAction {
  type: "ADD";
  payload: ICartItem;
}

interface ICartRemoveAction {
  type: "REMOVE";
  payload: string;
}

type CartAction = ICartAddAction | ICartRemoveAction;

const defaultCartState: ICartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: ICartState, action: CartAction): ICartState => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.payload.price * action.payload.amount;
    const foundIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const foundItem = state.items[foundIndex];

    let updatedItems;

    if (foundItem) {
      const updatedItem = {
        ...foundItem,
        amount: foundItem.amount + action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[foundIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.payload);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "REMOVE") {
    const delItemIndex = state.items.findIndex(
      (item) => item.id === action.payload
    );
    const delItem = state.items[delItemIndex];

    const updatedAmount = state.totalAmount - delItem.price;

    let updatedItems;

    if (delItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== delItem.id;
      });
    } else {
      const updatedItem = { ...delItem, amount: delItem.amount - 1 };

      updatedItems =  [...state.items];
      updatedItems[delItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  return defaultCartState;
};

const CartProvider: React.FC = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item: ICartItem) => {
    dispatchCartAction({ type: "ADD", payload: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", payload: id });
  };

  const cartContext: ICartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
