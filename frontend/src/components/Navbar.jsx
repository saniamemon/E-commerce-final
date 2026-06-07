import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { cart, message } = useContext(CartContext);
  const { auth, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {message && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded">
          {message}
        </div>
      )}

      <div className="flex justify-between items-center p-4 bg-black text-white">

        <Link to="/" className="text-xl font-bold">
          🛍️ Shop
        </Link>

        <div className="flex gap-5 items-center">

          <Link to="/">Home</Link>
          <Link to="/cart">
            Cart ({cart.length})
          </Link>

          {auth.user ? (
            <>
              <span>👤 {auth.user.name}</span>

              <button onClick={handleLogout} className="bg-red-500 px-3 py-1">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}

        </div>
      </div>
    </>
  );
};

export default Navbar;