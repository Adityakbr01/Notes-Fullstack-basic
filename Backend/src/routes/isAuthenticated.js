const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const cookieParser = require("cookie-parser");
const isLogin = require("../middleware/isLogin");


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure key

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const token  = req.cookies.token
  try {

    if(token){
      const decoded = jwt.verify(token, JWT_SECRET);
      if(decoded.id === req.body.id){
        return res.status(403).json({ message: "You are already logged in" });
      }
      else{
        res.clearCookie("token")
      }
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = req.cookies.token;

  // If a token is provided, validate it
  if (token) {
      // Verify the token
      const data = jwt.verify(token, JWT_SECRET);
      if (!data) {
        res.clearCookie("token");
        return res.status(403).json({ message: "Token expired" });
      }}
      if(!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

  try {
  
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id},
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Set the JWT token in an HTTP-only cookie
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000, // 1 hour
    });


    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/profile", isLogin,async (req, res) => {
  const token = req.cookies.token;
  if(!token) return res.redirect("login")
  try {
const decoded = jwt.verify(token,JWT_SECRET)
console.log(decoded)
    const user = await User.findById(decoded.id)
    res.json({ email: user.email, name: user.name,id: user._id})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});


module.exports = router;
