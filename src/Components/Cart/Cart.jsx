import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Model from "../UI/Model";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isFormClicked, setIsFormClicked] = useState(true);
  const [orderClicked, setOrderClicked] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const hashItem = cartCtx.items.length > 0;

  const orderButtonClicked = (e) => {
    e.preventDefault();
    console.log("Order button Clicked");
    setOrderClicked(true);
    setIsFormClicked(false);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Model onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {orderClicked && <Checkout />}
      {isFormClicked && (
        <div className={classes.actions}>
          <button onClick={props.onHideCart} className={classes["button--alt"]}>
            Close
          </button>
          {hashItem && (
            <button onClick={orderButtonClicked} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </Model>
  );
};

export default Cart;
