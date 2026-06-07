const router = require("express").Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;