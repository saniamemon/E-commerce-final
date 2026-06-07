const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      products,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      name,
      phone,
      address,
      products,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order Created",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order Failed",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
};