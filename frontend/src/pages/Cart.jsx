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
    <div className="p-4 sm:p-6 md:p-8 min-h-screen">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Cart is empty
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 border p-4 mb-4 rounded-lg shadow-sm bg-white"
            >

              <img
                src={`https://e-commerce-final-7ocn.onrender.com/uploads/${item.image}`}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>

                <p className="text-gray-600">
                  ₹ {item.price}
                </p>

                <div className="flex justify-center sm:justify-start gap-2 items-center mt-3">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 font-medium hover:text-red-700"
              >
                Remove
              </button>

            </div>
          ))}

          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
              Total: ₹ {totalPrice}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Clear Cart
              </button>

              <Link
                to="/checkout"
                className="bg-green-600 text-white px-4 py-2 rounded text-center w-full sm:w-auto"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;