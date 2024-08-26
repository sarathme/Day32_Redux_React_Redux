import { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "./cart/cartSlice";

function CartItem({ cartItem }) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  function handleChangeQuantity(e) {
    setQuantity(e.target.value);
    const payload = { id: cartItem.id, quantity: Number(e.target.value) };
    dispatch(updateQuantity(payload));
  }
  return (
    <>
      <div className="cartitem">
        <div className="img-block">
          <img src={cartItem.image} alt={cartItem.title} />
        </div>
        <div className="cartitem__details">
          <h3>{cartItem.title}</h3>
          <p>{cartItem.description}</p>
        </div>
        <div className="quantity">
          <label htmlFor={`cart-${cartItem.id}`}>Qty:</label>
          <select
            name="cart-quantity"
            id={`cart-${cartItem.id}`}
            value={quantity}
            onChange={handleChangeQuantity}>
            {Array.from({ length: cartItem.quantityAvailable }).map((el, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>

        <div className="price">
          <p>${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
          <button onClick={() => dispatch(deleteItem(cartItem.id))}>
            Remove From Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
