const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ========================
// 🔥 ROUTES
// ========================

// AUTH
app.use("/api/auth", require("./routes/authRoute"));

// PRODUCTS
app.use("/api/product", require("./routes/productRoute"));

// ORDERS
app.use("/api/order", require("./routes/orderRoutes"));

// ADMIN
app.use("/api/admin", require("./routes/adminRoutes"));

// ========================
// 🔥 DATABASE CONNECTION
// ========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ========================
// 🔥 SERVER START
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});