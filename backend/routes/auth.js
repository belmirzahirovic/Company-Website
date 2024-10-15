const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Admin login route
router.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password: "****" });

    // Check if admin exists
    let admin = await Admin.findOne({ username });
    console.log("Admin found:", admin ? "Yes" : "No");

    if (!admin) {
      console.log("Admin not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and return JWT
    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        console.log("JWT created successfully");
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
