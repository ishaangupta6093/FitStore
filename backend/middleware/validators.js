const { body, validationResult } = require("express-validator");

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: extractedErrors,
    });
  }

  next();
};

// Register validation
const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validate,
];

// Login validation
const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];

// Product validation
const productValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 200 })
    .withMessage("Product name cannot exceed 200 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Protein", "Creatine", "Pre Workout", "Accessories", "BCAA", "Vitamins"])
    .withMessage("Invalid category"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  validate,
];

// Order validation
const orderValidator = [
  body("shippingAddress.address")
    .trim()
    .notEmpty()
    .withMessage("Shipping address is required"),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.pinCode")
    .trim()
    .notEmpty()
    .withMessage("PIN code is required"),

  body("shippingAddress.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["COD", "Online"])
    .withMessage("Payment method must be COD or Online"),

  validate,
];

module.exports = {
  registerValidator,
  loginValidator,
  productValidator,
  orderValidator,
};
