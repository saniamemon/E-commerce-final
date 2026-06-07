import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border p-4 mb-3 rounded"
            >

              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                className="w-20 h-20 object-cover"
              />

              <div className="flex-1">
                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p>₹ {item.price}</p>

                <div className="flex gap-2 items-center mt-2">
                  <button onClick={() => decreaseQty(item._id)} className="px-2 bg-gray-300">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)} className="px-2 bg-gray-300">+</button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500"
              >
                Remove
              </button>

            </div>
          ))}

          <h2 className="text-xl font-bold">
            Total: ₹ {totalPrice}
          </h2>

          <div className="flex gap-4 mt-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2"
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="bg-green-600 text-white px-4 py-2"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;