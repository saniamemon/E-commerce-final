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
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        🛍️ My E-Commerce Store
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={`https://e-commerce-final-7ocn.onrender.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-52 sm:h-56 md:h-60 object-contain bg-gray-100"
            />

            {/* DETAILS */}
            <div className="p-4">

              <h2 className="font-bold text-lg sm:text-xl line-clamp-1">
                {product.title}
              </h2>

              <p className="text-gray-500 text-sm mt-2 min-h-[40px]">
                {product.description.slice(0, 60)}...
              </p>

              <p className="text-xl sm:text-2xl font-bold mt-3">
                ₹ {product.price}
              </p>

              <Link
                to={`/product/${product._id}`}
                className="block text-center bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 transition"
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