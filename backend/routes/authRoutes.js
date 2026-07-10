const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/validators");

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", logout);

router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

module.exports = router;
