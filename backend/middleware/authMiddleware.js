const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/errorHandler");

// Protect routes — require authentication
const protect = async (req, res, next) => {
  try {
    let token;

    // Check cookie first, then Authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Not authorized. Please log in", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Not authorized. Token failed", 401));
  }
};

// Restrict to admin only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new AppError("Access denied. Admin only", 403));
  }
};

module.exports = { protect, adminOnly };
