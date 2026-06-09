import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");
    navigate("/login");
  };








return (
  <div className="p-4 sm:p-6 md:p-10 bg-gray-100 min-h-screen">

    <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
      Admin Dashboard
    </h1>

    {/* NAVIGATION BUTTONS */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">

      <Link
        to="/admin/products"
        className="bg-blue-500 text-white px-5 py-3 rounded hover:bg-blue-600 text-center w-full sm:w-auto"
      >
        Manage Products
      </Link>

      <Link
        to="/admin/orders"
        className="bg-green-500 text-white px-5 py-3 rounded hover:bg-green-600 text-center w-full sm:w-auto"
      >
        Manage Orders
      </Link>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-3 rounded hover:bg-red-600 w-full sm:w-auto"
      >
        Logout
      </button>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded shadow text-center sm:text-left">
        <h2 className="text-lg font-semibold">
          Products
        </h2>

        <p className="text-3xl font-bold text-blue-500 mt-2">
          {stats.products || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center sm:text-left">
        <h2 className="text-lg font-semibold">
          Orders
        </h2>

        <p className="text-3xl font-bold text-green-500 mt-2">
          {stats.orders || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center sm:text-left">
        <h2 className="text-lg font-semibold">
          Revenue
        </h2>

        <p className="text-3xl font-bold text-purple-500 mt-2 break-words">
          ₹ {stats.revenue || 0}
        </p>
      </div>

    </div>

  </div>
);
}
export default AdminDashboard;