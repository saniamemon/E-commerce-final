import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/admin/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axiosInstance.delete(`/admin/product/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-100 min-h-screen">
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        All Products
      </h1>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold">
                {p.title}
              </h2>

              <p className="text-gray-600">
                ₹ {p.price}
              </p>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminProducts;