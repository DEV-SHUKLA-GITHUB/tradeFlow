const express = require('express');
const router = express.Router();
const User = require("../models/userDetails"); // Import the user schema from userDetails.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";


router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    // Validate user credentials
    try {
      // Find the user by email in your database
      const user = await User.findOne({ email });
  
      // If user does not exist, send an error response
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Compare the password provided with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // If password is invalid, send an error response
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Generate a JSON Web Token (JWT) for authentication
      const token = jwt.sign({ email: user.email }, JWT_SECRET);
  console.log(token)
      // Send the token as a response
      console.log("loged in")
      res.json({ status: "ok", token: token, data:user});
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  });

module.exports=router;

 
  