const Product = require("../models/Product");
const AppError = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const resPerPage = 12;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sort();

    // Clone query for filtered count before pagination
    const filteredProductsCount = await Product.countDocuments(
      apiFeatures.query.getFilter()
    );

    apiFeatures.paginate();
    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      productsCount,
      filteredProductsCount,
      resPerPage,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json({
        success: true,
        product,
      });
    } else {
      return next(new AppError("Product not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    
    // Convert url param (e.g. 'pre-workout') back to category name if needed
    // or just match directly (assuming UI sends proper name)
    const products = await Product.find({ 
      category: { $regex: new RegExp(`^${category}$`, 'i') } 
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN ROUTES

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
