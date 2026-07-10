const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { orderValidator } = require("../middleware/validators");

router
  .route("/")
  .post(protect, orderValidator, createOrder)
  .get(protect, adminOnly, getAllOrders);

router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/status").put(protect, adminOnly, updateOrderStatus);

module.exports = router;
