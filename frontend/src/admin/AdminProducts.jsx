import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);


    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        stock: "",
        description: "",
        image: null,
    });

    const [form, setForm] = useState({
        title: "",
        price: "",
        stock: "",
        description: "",
        image: ""
    });

    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get("/product");
            setProducts(res.data.products || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);

        setForm({
            title: product.title || "",
            price: product.price || "",
            stock: product.stock || "",
            description: product.description || "",
            image: ""
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImage = (e) => {
        setForm({
            ...form,
            image: e.target.files[0]
        });
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("price", form.price);
            formData.append("stock", form.stock);
            formData.append("description", form.description);

            if (form.image) {
                formData.append("image", form.image);
            }

            await axiosInstance.put(
                `/product/${editingProduct._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Product Updated Successfully");

            setEditingProduct(null);
            fetchProducts();

        } catch (error) {
            console.log(error);
            alert("Update Failed");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/product/${id}`);

            alert("Product Deleted");
            fetchProducts();

        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };
    const handleAddChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddImage = (e) => {
        setNewProduct({
            ...newProduct,
            image: e.target.files[0],
        });
    };

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();

            formData.append("title", newProduct.title);
            formData.append("price", newProduct.price);
            formData.append("stock", newProduct.stock);
            formData.append("description", newProduct.description);

            if (newProduct.image) {
                formData.append("image", newProduct.image);
            }

            await axiosInstance.post("/product/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Product Added Successfully");

            setShowAddModal(false);

            setNewProduct({
                title: "",
                price: "",
                stock: "",
                description: "",
                image: null,
            });

            fetchProducts();

        } catch (error) {
            console.log(error);
            alert("Failed To Add Product");
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Admin Products
                </h1>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Add Product
                </button>
            </div>

            <div className="grid gap-4">

                {products.map((p) => (
                    <div
                        key={p._id}
                        className="border rounded-lg p-4 shadow bg-white"
                    >
                        <div className="flex items-center gap-4">

                            {p.image && (
                                <img
                                    src={`http://localhost:5000/uploads/${p.image}`}
                                    alt={p.title}
                                    // className="w-24 h-24 object-cover rounded"
                                    className="w-24 h-24 object-contain bg-gray-100 rounded"
                                />
                            )}

                            <div className="flex-1">
                                <h2 className="font-bold text-lg">
                                    {p.title}
                                </h2>

                                <p>₹ {p.price}</p>

                                <p>Stock: {p.stock}</p>
                            </div>

                            <button
                                onClick={() => handleEdit(p)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(p._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

            </div>

            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-lg w-[500px]">

                        <h2 className="text-2xl font-bold mb-4">
                            Editing: {editingProduct.title}
                        </h2>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            className="border p-2 w-full mb-3"
                        />

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border p-2 w-full mb-3"
                        />

                        <div className="mb-3">
                            <label className="font-semibold block mb-1">
                                Current Image
                            </label>

                            {editingProduct.image && (
                                <img
                                    src={`http://localhost:5000/uploads/${editingProduct.image}`}
                                    alt="Current"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="font-semibold block mb-1">
                                Change Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="border p-2 w-full"
                            />
                        </div>

                        {form.image instanceof File && (
                            <div className="mb-3">
                                <label className="font-semibold block mb-1">
                                    New Image Preview
                                </label>

                                <img
                                    src={URL.createObjectURL(form.image)}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                            </div>
                        )}

                        <div className="flex gap-3 mt-4">

                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditingProduct(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-lg w-[500px]">

                        <h2 className="text-2xl font-bold mb-4">
                            Add Product
                        </h2>

                        <input
                            type="text"
                            name="title"
                            value={newProduct.title}
                            onChange={handleAddChange}
                            placeholder="Title"
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleAddChange}
                            placeholder="Price"
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleAddChange}
                            placeholder="Stock"
                            className="border p-2 w-full mb-3"
                        />

                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleAddChange}
                            placeholder="Description"
                            className="border p-2 w-full mb-3"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddImage}
                            className="border p-2 w-full mb-3"
                        />

                        <div className="flex gap-3">

                            <button
                                onClick={handleAddProduct}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Add Product
                            </button>

                            <button
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default AdminProducts;