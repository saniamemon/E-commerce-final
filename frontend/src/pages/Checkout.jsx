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
    paymentMethod: "COD",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const placeOrder = async () => {
    if (
      form.name.trim() === "" ||
      form.phone.trim() === "" ||
      form.address.trim() === ""
    ) {
      setError("Please fill all details");
      return;
    }

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
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6">

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-4 sm:p-6 md:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold mb-5 text-center sm:text-left">
          Checkout
        </h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded"
        />

        {/* PHONE */}
        <input
          name="phone"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded"
        />

        {/* ADDRESS */}
        <textarea
          name="address"
          placeholder="Enter Address"
          value={form.address}
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded min-h-[100px]"
        />

        {/* PAYMENT METHOD */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">
            Payment Method
          </h2>

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
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Total: ₹ {totalPrice}
        </h2>

        {/* BUTTON */}
        <button
          onClick={placeOrder}
          className="bg-black text-white w-full py-3 rounded hover:bg-gray-800 transition"
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Checkout;