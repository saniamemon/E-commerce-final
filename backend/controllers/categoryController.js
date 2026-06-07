const Category = require("../models/Category");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name
    });

    res.status(201).json({
      success: true,
      message: "Category Created",
      category
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error Creating Category"
    });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error Fetching Categories"
    });
  }
};

module.exports = {
  createCategory,
  getCategories
};