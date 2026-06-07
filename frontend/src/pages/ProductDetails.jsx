import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 CHECK IF ALREADY IN CART
  const isInCart = product
    ? cart.some((item) => item._id === product._id)
    : false;

  // ⏳ LOADING STATE
  if (loading) {
    return <div className="p-10 text-xl">Loading product...</div>;
  }

  // ❌ ERROR STATE
  if (!product) {
    return <div className="p-10 text-red-500">Product not found</div>;
  }

  return (
    <div className="p-10 grid md:grid-cols-2 gap-10 bg-gray-50 min-h-screen">

      {/* IMAGE */}
      <div className="bg-white p-4 rounded shadow">
        <img
          src={
            product.image
              ? `http://localhost:5000/uploads/${product.image}`
              : "https://via.placeholder.com/400"
          }
           className="w-full max-h-[400px] object-contain  rounded"
          alt={product.title}
        />
      </div>

      {/* DETAILS */}
      <div className="bg-white p-6 rounded shadow">

        <h1 className="text-3xl font-bold">
          {product.title}
        </h1>

        <p className="text-gray-600 mt-4">
          {product.description}
        </p>

        <p className="text-2xl font-bold mt-4 text-green-600">
          ₹ {product.price}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Stock: {product.stock}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={() => addToCart(product)}
          disabled={isInCart || product.stock === 0}
          className={`px-6 py-3 mt-6 rounded text-white w-full ${
            isInCart || product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {isInCart
            ? "Already in Cart"
            : product.stock === 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

      </div>
    </div>
  );
};

export default ProductDetails;