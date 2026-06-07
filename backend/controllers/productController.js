const Product = require("../models/Product");

// ➕ CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { title, price, description, category, stock } = req.body;

        const image = req.file ? req.file.filename : null;

        const product = await Product.create({
            title,
            price,
            description,
            category,
            stock,
            image // ✅ FIXED (you were NOT saving image before)
        });

        res.status(201).json({
            success: true,
            message: "Product Created",
            product
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error Creating Product"
        });
    }
};

// 📦 GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);
    }
};

// 🔍 GET SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.log(error);
    }
};

// ✏️ UPDATE PRODUCT (🔥 FIXED - IMPORTANT)
const updateProduct = async (req, res) => {
    try {
        const { title, price, description, category, stock } = req.body;

        const updatedData = {
            title,
            price,
            description,
            category,
            stock
        };

        // ✅ only update image if new file comes
        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Product Updated",
            product
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error Updating Product"
        });
    }
};

// ❌ DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product Deleted"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error Deleting Product"
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};