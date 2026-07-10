const User = require("../models/User");
const Product = require("../models/Product");
const AppError = require("../utils/errorHandler");

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "cart.product",
      "name price image stock"
    );

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    if (product.stock < quantity) {
      return next(new AppError("Not enough stock available", 400));
    }

    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity = quantity;
      // Also update name/price/image in case they changed
      existingItem.name = product.name;
      existingItem.price = product.price;
      existingItem.image = product.image;
    } else {
      user.cart.push({
        product: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
      message: "Item added to cart",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return next(new AppError("Item not found in cart", 404));
    }

    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      return next(new AppError("Not enough stock available", 400));
    }

    item.quantity = quantity;
    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
      message: "Item removed from cart",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
      message: "Cart cleared",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
