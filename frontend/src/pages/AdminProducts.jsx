import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        const res = await axiosInstance.get("/admin/products");
        setProducts(res.data);
    };
    const deleteProduct = async (id) => {
        await axiosInstance.delete(/admin/product / ${id});
        fetchProducts();
    }; useEffect(() => { fetchProducts(); }, []);
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">All Products</h1>
            {products.map((p) => (<div key={p._id} className="border p-4 mb-3 flex justify-between">
                <div>
                    <h2>{p.title}</h2>
                    <p>₹ {p.price}</p>
                </div>
                <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1" >
                    Delete </button>
            </div>))}
        </div>);
};
export default AdminProducts;