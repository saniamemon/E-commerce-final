const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const upload = require("../middleware/uploads");

// ➕ CREATE PRODUCT
router.post(
  "/create",
  upload.single("image"),
  createProduct
);

// 📦 GET ALL PRODUCTS
router.get("/", getProducts);

// 🔍 GET SINGLE PRODUCT
router.get("/:id", getProductById);

// ✏️ UPDATE PRODUCT
router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);

// ❌ DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;