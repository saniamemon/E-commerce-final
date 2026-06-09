import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold mb-5 text-center">
          Register
        </h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 mb-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 mb-3 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 mb-3 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Register
        </button>

        <p className="mt-4 text-sm sm:text-base text-center">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700"
          >
            {" "}Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;