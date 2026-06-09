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
        <div className="p-4 sm:p-6 md:p-10">

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
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

                    <table className="min-w-[900px] w-full border border-gray-200 bg-white shadow-md rounded-lg">

                        {/* Table Head */}
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left whitespace-nowrap">Customer</th>
                                <th className="p-3 text-left whitespace-nowrap">Phone</th>
                                <th className="p-3 text-left whitespace-nowrap">Address</th>
                                <th className="p-3 text-left whitespace-nowrap">Amount</th>
                                <th className="p-3 text-left whitespace-nowrap">Status</th>
                                <th className="p-3 text-left whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {orders.map((o) => (
                                <tr key={o._id} className="border-t">

                                    <td className="p-2 sm:p-3 font-medium whitespace-nowrap">
                                        {o.name}
                                    </td>

                                    <td className="p-2 sm:p-3 whitespace-nowrap">
                                        {o.phone}
                                    </td>

                                    <td className="p-2 sm:p-3 whitespace-nowrap">
                                        {o.address}
                                    </td>

                                    <td className="p-2 sm:p-3 font-semibold whitespace-nowrap">
                                        ₹ {o.totalAmount}
                                    </td>

                                    {/* STATUS */}
                                    <td className="p-2 sm:p-3 whitespace-nowrap">
                                        <span className={`text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${getStatusColor(o.status)}`}>
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="p-2 sm:p-3">
                                        <div className="flex flex-col sm:flex-row gap-2">

                                            <button
                                                onClick={() => updateStatus(o._id, "Shipped")}
                                                className="bg-blue-500 text-white px-3 py-1 rounded w-full sm:w-auto text-sm"
                                            >
                                                Ship
                                            </button>

                                            <button
                                                onClick={() => updateStatus(o._id, "Delivered")}
                                                className="bg-green-600 text-white px-3 py-1 rounded w-full sm:w-auto text-sm"
                                            >
                                                Deliver
                                            </button>
                                            </div>

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