import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/product")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-8">
        🛍️ My E-Commerce Store
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition"
          >

            {/* IMAGE */}
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-48 object-contain bg-gray-100 rounded"
            />

            {/* DETAILS */}
            <div className="p-4">

              <h2 className="font-bold text-lg">
                {product.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {product.description.slice(0, 60)}...
              </p>

              <p className="text-xl font-bold mt-2">
                ₹ {product.price}
              </p>

              <Link
                to={`/product/${product._id}`}
                className="block text-center bg-black text-white py-2 mt-3 rounded"
              >
                View Product
              </Link>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProductList;