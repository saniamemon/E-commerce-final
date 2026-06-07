import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ MESSAGE STATE (NEW)
  const [message, setMessage] = useState("");

  // ➕ ADD TO CART
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setMessage("⚠️ Already in cart");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      return;
    }

    setCart([...cart, { ...product, quantity: 1 }]);

    // ✅ SUCCESS MESSAGE
    setMessage("✅ Product added to cart successfully");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // ❌ CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // ➕ INCREASE QTY
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ DECREASE QTY
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,

        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,

        totalPrice,

        // ✅ NEW EXPORTS
        message,
        setMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;