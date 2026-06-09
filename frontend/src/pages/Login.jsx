import React, { useState, useContext } from "react";
import axiosInstance from "../config/axiosConfig.js";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", form);

      login(res.data.user, res.data.token);

      alert("Login Successful");
      console.log(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold mb-5 text-center">
          Login
        </h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 mb-3 rounded text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 w-full mt-2 rounded"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 w-full mt-3 rounded"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-4 py-3 mt-5 w-full rounded hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <p className="mt-4 text-sm sm:text-base text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;