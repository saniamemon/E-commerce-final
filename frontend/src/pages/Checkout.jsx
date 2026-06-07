import React, { useState, useContext } from "react";
import axiosInstance from "../config/axiosConfig";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD", // ✅ DEFAULT SELECTED
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // remove error while typing
  };

  const placeOrder = async () => {
    // ❌ VALIDATION
    if (
      form.name.trim() === "" ||
      form.phone.trim() === "" ||
      form.address.trim() === ""
    ) {
      setError("Please fill all details");
      return;
    }

    // optional phone validation
    if (form.phone.length !== 10) {
      setError("Please enter valid 10-digit phone number");
      return;
    }

    const orderData = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      products: cart,
      totalAmount: totalPrice,
      paymentMethod: form.paymentMethod,
      status: "Pending",
    };

    try {
      await axiosInstance.post("/order/create", orderData);

      alert("Order placed successfully (COD)");

      setCart([]);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded mt-10">

      <h1 className="text-2xl font-bold mb-5">Checkout</h1>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      {/* NAME */}
      <input
        name="name"
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      {/* PHONE */}
      <input
        name="phone"
        placeholder="Enter Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      {/* ADDRESS */}
      <textarea
        name="address"
        placeholder="Enter Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      {/* PAYMENT METHOD */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Payment Method</h2>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={form.paymentMethod === "COD"}
            onChange={handleChange}
          />
          Cash on Delivery (COD)
        </label>
      </div>

      {/* TOTAL */}
      <h2 className="text-lg font-bold mb-4">
        Total: ₹ {totalPrice}
      </h2>

      {/* BUTTON */}
      <button
        onClick={placeOrder}
        className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
      >
        Place Order
      </button>

    </div>
  );
};

export default Checkout;