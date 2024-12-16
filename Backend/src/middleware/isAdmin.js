require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET;

const adminAuth = async(req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const isValidAdmin = await UserModel.findById(decoded.id)
    if (isValidAdmin.role.toString() !== process.env.IsAdmin) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.admin = decoded; // Add admin info to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminAuth;
