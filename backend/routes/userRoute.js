const express = require("express");
const router = express.Router();
const {
  requireSignIn
} = require("../middleware/authMiddleware");

const { register , loginUser} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", loginUser);
router.get(
  "/profile",
  requireSignIn,
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  }
);

module.exports = router;