const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

// DASHBOARD STATS
router.get("/stats", async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      products,
      orders,
      revenue: revenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ORDERS
router.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// UPDATE ORDER
router.put("/order/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(order);
});

module.exports = router;