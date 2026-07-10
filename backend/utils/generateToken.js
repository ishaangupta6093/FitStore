const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: (parseInt(process.env.COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000,
    path: "/",
  };

  res.cookie("token", token, cookieOptions);

  return token;
};

module.exports = generateToken;
