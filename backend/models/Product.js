const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
      maxLength: [200, "Name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price must be positive"],
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
      default: "/products/placeholder.jpg",
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: [true, "Please select category for this product"],
      enum: {
        values: [
          "Protein",
          "Creatine",
          "Pre Workout",
          "Accessories",
          "BCAA",
          "Vitamins",
        ],
        message: "Please select correct category for product",
      },
    },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
      required: [true, "Please add product stock"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    badge: {
      type: String,
      enum: ["New", "Best Seller", "Hot", "Popular", ""],
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
