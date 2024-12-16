const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Make sure this matches your actual secret key

// Middleware to verify if the user is logged in (token verification)
const isLogin = (req, res, next) => {
  // Get the token from cookies (or you can check headers)
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Authorization header contains "Bearer token"

  // If no token, return unauthorized response
  if (!token) {
    return res.status(300).json({ message: "No token provided, access denied login" });
  }

  try {
    // Verify the token using jwt.verify
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user info to the request object for later use
    req.user = decoded; // You can access `req.user.id`, `req.user.role`, etc.

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(200).json({ message: "Invalid or expired token" });
  }
};

module.exports = isLogin;
