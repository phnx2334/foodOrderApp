import React from "react";
import { ICartItem } from "../types/cartTypes";

export interface ICartContext {
  items: ICartItem[];
  totalAmount: number;
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<ICartContext>({
  items: [],
  totalAmount: 0,
  addItem: (item:ICartItem) => {},
  removeItem: (id:string) => {},
});

export default CartContext;
