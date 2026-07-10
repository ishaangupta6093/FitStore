const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { productValidator } = require("../middleware/validators");

router.route("/").get(getProducts).post(protect, adminOnly, productValidator, createProduct);

router.route("/featured").get(getFeaturedProducts);

router.route("/category/:category").get(getProductsByCategory);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, adminOnly, productValidator, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

module.exports = router;
