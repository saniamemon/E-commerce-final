import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/order");
      setOrders(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/order/${id}`, { status });
      fetchOrders(); // refresh
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // STATUS COLOR FUNCTION
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Shipped":
        return "bg-blue-500";
      case "Delivered":
        return "bg-green-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 md:p-10">

      <h1 className="text-3xl font-bold mb-6">
        📦 Admin Orders Panel
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">Loading orders...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* Empty State */}
      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {/* Orders Table */}
      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200 bg-white shadow-md rounded-lg">

            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {orders.map((o) => (
                <tr key={o._id} className="border-t">

                  <td className="p-3 font-medium">
                    {o.name}
                  </td>

                  <td className="p-3">
                    {o.phone}
                  </td>

                  <td className="p-3">
                    {o.address}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹ {o.totalAmount}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span className={`text-white px-3 py-1 rounded text-sm ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => updateStatus(o._id, "Shipped")}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Ship
                    </button>

                    <button
                      onClick={() => updateStatus(o._id, "Delivered")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Deliver
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>
          </table>

        </div>
      )}

    </div>
  );
};

export default AdminOrders;