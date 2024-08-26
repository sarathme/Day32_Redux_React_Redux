import { useSelector } from "react-redux";
import CartItem from "./CartItem";

function CartList() {
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0
  );

  const shippingPrice = totalPrice <= 500 ? totalPrice * 0.1 : 0;

  const grandTotal = totalPrice + shippingPrice;
  return (
    <div>
      {cartItems.length === 0 && (
        <div className="empty-cart">
          <p>No Items in Cart</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-block">
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </div>
      )}

      {totalPrice > 0 && (
        <>
          <div className="cart-description">
            <div className="subtotal">
              <h3>Sub Total</h3>
              <p>${totalPrice.toFixed(2)}</p>
            </div>

            <div className="subtotal">
              <h3>Shipping</h3>
              <p>{shippingPrice > 0 ? shippingPrice.toFixed(2) : "Free"}</p>
            </div>
          </div>
          <hr />
        </>
      )}
      <div className="total">
        <h3>Total</h3>
        <p>${grandTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartList;
