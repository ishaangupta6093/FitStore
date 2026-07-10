const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect, adminOnly); // All admin routes require admin auth

router.route("/stats").get(getDashboardStats);

router.route("/users").get(getAllUsers);

router.route("/users/:id/role").put(updateUserRole);

router.route("/users/:id").delete(deleteUser);

module.exports = router;
